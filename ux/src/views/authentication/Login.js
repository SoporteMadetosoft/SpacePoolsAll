import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import useJwt from '@src/auth/jwt/useJwt'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@auth/redux/actions'
import { AbilityContext } from '@src/utility/context/Can'
import { Link, useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee } from 'react-feather'
import {
  Alert,
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,
  UncontrolledTooltip
} from 'reactstrap'

import '@styles/base/pages/page-auth.scss'
import CardImg from 'reactstrap/lib/CardImg'

const ToastContent = ({ name, role }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Bienvenido/a, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>Has iniciado sesión correctamente como {role}.</span>
    </div>
  </Fragment>
)

const Login = props => {
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { register, errors, handleSubmit } = useForm() 

  const illustration = skin === 'dark' ? 'background1.png' : 'background1.png',
    source = require(`@src/assets/images/backgrounds/${illustration}`).default
    const logoLogin = require(`@src/assets/images/ico/favicon.png`).default

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {
  
      useJwt
        .login({ email, password })
        .then(res => {
          const data = { ...res.data.userData, accessToken: res.data.accessToken, refreshToken: res.data.refreshToken }
          dispatch(handleLogin(data))
          ability.update(res.data.userData.ability)
          history.push(getHomeRouteForLoggedInUser(data.role))
          toast.success(
            <ToastContent name={data.fullName || data.username || 'No usename'} role={data.role || 'admin'} />,
            { transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>
      <Col className='d-none d-lg-flex align-items-center' lg='8' sm='12'  style={{padding: '0px'}} >
          <div className='w-100 h-100 d-lg-flex align-items-center justify-content-center'>
            <img className='img-fluid' src={source} alt='Login V2' style={{ width: '200%' }}/>
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <div className="d-flex d-lg-flex align-items-center justify-content-center mb-2">
                <CardImg src={logoLogin} style={{width: '200px'}} />
              </div>
            <CardTitle tag='h2' className='font-weight-bold mb-1 d-flex d-lg-flex align-items-center justify-content-center mb-1'>
              Bienvenido a Beta SFP
            </CardTitle>

            <CardText className='mb-1 d-flex d-lg-flex align-items-center justify-content-center'>
              Por favor, introduce tus datos de acceso
            </CardText>
            
            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-email'>
                  Email
                </Label>
                <Input
                  autoFocus
                  type='email'
                  value={email}
                  id='login-email'
                  name='login-email'
                  placeholder='Email'
                  onChange={e => setEmail(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-email'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Contraseña
                  </Label>
                  <Link to='/forgot-password'>
                    <small>¿Olvidaste la contraseña?</small>
                  </Link>
                </div>
                <InputPasswordToggle 
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge mb-2'  
                  htmlFor='merge-password'
                  onChange={e => setPassword(e.target.value)}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />

                {/* <InputPasswordToggle
                  value={password}
                  id='login-password'
                  name='login-password'
                  className='input-group-merge mb-2'
                  htmlFor='merge-password'
                  onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login-password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                /> */}
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Recuérdame' />
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Acceder
              </Button.Ripple>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default Login
