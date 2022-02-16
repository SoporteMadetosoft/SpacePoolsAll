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
import { Row, Col, CardImg, CardTitle, CardText, Form, Input, FormGroup, Label, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

const ToastContent = ({ title, color, message }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color={color} icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>{title}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>{message}</span>
    </div>
  </Fragment>
)

const Login = () => {
  const [skin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')

  const { register, errors, handleSubmit } = useForm()

  const illustration = skin === 'dark' ? 'background1.png' : 'background1.png',
    source = require(`@src/assets/images/backgrounds/${illustration}`).default
  const logoLogin = require(`@src/assets/images/ico/favicon.png`).default

  const onSubmit = (data) => {
    if (isObjEmpty(errors)) {

      useJwt
        .login({ login, password })
        .then(res => {
          console.log(res)
          if (res.data.status === 401) {
            toast.error(
              <ToastContent title={'Acceso denegado'} message={'No se han podido validar los datos de acceso'} color='danger' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          } else {
            const { data } = res
            dispatch(handleLogin(data))
            // ability.update(res.data.data.userData.ability)
            // history.push(getHomeRouteForLoggedInUser(data.role))
            toast.success(
              <ToastContent title={`Acceso autorizado`} message={'Se han validado los datos de acceso'} color='success' />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
          }
        })
        .catch(err => console.log(err))
    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner'>
        <Col className='d-none d-lg-flex align-items-center' lg='8' sm='12' style={{ padding: '0px', margin: '0px' }} >
          <div className='w-100 h-100 d-lg-flex align-items-center justify-content-center'>
            <img className='img-fluid w-100 h-100' src={source} />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12' style={{ padding: '0px', margin: '0px' }}>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <div className="d-flex d-lg-flex align-items-center justify-content-center mb-2">
              <CardImg src={logoLogin} style={{ width: '200px' }} />
            </div>
            <CardTitle tag='h2' className='font-weight-bold mb-1 d-flex d-lg-flex align-items-center justify-content-center mb-1'>
              Bienvenido a CONMED
            </CardTitle>

            <CardText className='mb-1 d-flex d-lg-flex align-items-center justify-content-center'>
              Por favor, introduce tus datos de acceso
            </CardText>

            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login'>
                  Login
                </Label>
                <Input
                  autoFocus
                  value={login}
                  id='login'
                  name='login'
                  placeholder='Login'
                  onChange={e => setLogin(e.target.value)}
                  className={classnames({ 'is-invalid': errors['login'] })}
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
