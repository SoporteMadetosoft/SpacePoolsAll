import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft, XOctagon } from 'react-feather'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { sendEmail } from '../../utility/helpers/Axios/sendEmail'
import { useState, Fragment } from 'react'
import axios from 'axios'
import { endPoints } from '../../fixed/endPoints'
import Avatar from 'antd/lib/avatar/avatar'
import { toast, Slide } from 'react-toastify'

const ToastError = () => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <h6 className='toast-title font-weight-bold'>Error</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>El correo que has especificado no pertenece a ningún usuario.</span>
    </div>
  </Fragment>
)

const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()
  const history = useHistory()
  const [email, setEmail] = useState()

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const submit = async (e) => {
    e.preventDefault()
    const { data } = await axios.post(`${process.env.REACT_APP_HOST_URI}${endPoints['Users']}/checkEmail`, { email })
    console.log(data)
    if (data.ok === true) {
      toast.warning(
        <ToastError />,
        { transition: Slide, hideProgressBar: true, autoClose: 8000 }
      )
    } else {
      sendEmail('ForgotPassword', { email })
    }
    //setEmail()
    //history.push('/')
  }

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
            <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
              <img className='img-fluid' src={source} alt='Login V2' />
            </div>
          </Col>
          <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
            <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
              <CardTitle tag='h2' className='font-weight-bold mb-1'>
                ¿Contraseña olvidada?
              </CardTitle>
              <CardText className='mb-2'>
                Introduce tu email y te enviaremos instrucciones para reestablecer tu contraseña
              </CardText>
              <Form className='auth-forgot-password-form mt-2' onSubmit={submit}>
                <FormGroup>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Input type='email' id='email' placeholder='Email' autoFocus value={email} onChange={e => setEmail(e.target.value)} />
                </FormGroup>
                <Button.Ripple type='submit' color='primary' block>
                  Enviar instrucciones
                </Button.Ripple>
              </Form>
              <p className='text-center mt-2'>
                <Link to='/login'>
                  <ChevronLeft className='mr-25' size={14} />
                  <span className='align-middle'>Volver al login</span>
                </Link>
              </p>
            </Col>
          </Col>
        </Row>
      </div>
    )
  } else {
    return <Redirect to='/' />
  }
}

export default ForgotPassword
