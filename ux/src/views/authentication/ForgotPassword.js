import { isUserLoggedIn } from '@utils'
import { useSkin } from '@hooks/useSkin'
import { ChevronLeft } from 'react-feather'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, CardTitle, CardText, Form, FormGroup, Label, Input, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'

const ForgotPassword = () => {
  const [skin, setSkin] = useSkin()

  const illustration = skin === 'dark' ? 'forgot-password-v2-dark.svg' : 'forgot-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  if (!isUserLoggedIn()) {
    return (
      <div className='auth-wrapper auth-v2'>
        <Row className='auth-inner m-0'>
          <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
            
            <h2 className='brand-text text-primary ml-1'>Space Pools</h2>
          </Link>
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
              <Form className='auth-forgot-password-form mt-2' onSubmit={e => e.preventDefault()}>
                <FormGroup>
                  <Label className='form-label' for='login-email'>
                    Email
                  </Label>
                  <Input type='email' id='login-email' placeholder='Email' autoFocus />
                </FormGroup>
                <Button.Ripple color='primary' block>
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
