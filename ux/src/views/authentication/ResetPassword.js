import { useSkin } from '@hooks/useSkin'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import InputPassword from '@components/input-password-toggle'
import { Row, Col, CardTitle, Form, FormGroup, Label, Button } from 'reactstrap'
import '@styles/base/pages/page-auth.scss'
import { useState } from 'react'
import { ValidateToken } from '../../utility/helpers/Axios/ValidateToken'
import PasswordStrengthBar from 'react-password-strength-bar'
import { toast } from 'react-toastify'
import generator from 'generate-password'
import { recoverPassword } from '../../utility/helpers/Axios/recoverPassword'

const ResetPassword = () => {
  const [skin, setSkin] = useSkin()
  const { token } = useParams()
  const [password, setPassword] = useState()
  const [confirmPassword, setConfirmPassword] = useState()
  const history = useHistory()


  const { email } = JSON.parse(window.atob(token.split('.')[1]))

  const illustration = skin === 'dark' ? 'reset-password-v2-dark.svg' : 'reset-password-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const ToastError = ({ msg = null }) => (
    <>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <h6 className='toast-title font-weight-bold'>Algo ha salido mal</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>{msg ? msg : "El E-mail o Contraseña son incorrectos"}</span>
      </div>
    </>
  )

  const ToastContent = () => (
    <>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <h6 className='toast-title font-weight-bold'>Contraseña modificada</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span>Se ha cambiado la contraseña correctamente</span>
      </div>
    </>
  )

  const SuccessProgressToast = () => (
    <>
      <div className='toastify-header'>
        <div className='title-wrapper'>
          <h6 className='toast-title'>¡Contraseña generada!</h6>
        </div>
      </div>
      <div className='toastify-body'>
        <span role='img' aria-label='toast-text'>
          📋 Se ha copiado la contraseña generada al portapapeles.
        </span>
      </div>
    </>
  )

  const generatePass = (e) => {
    e.preventDefault()
    const password = generator.generate({
      length: 12,
      numbers: true,
      symbols: true
    })
    setPassword(password)
    setConfirmPassword(password)
    navigator.clipboard.writeText(password)
    toast.success(<SuccessProgressToast />)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    let error
    if (await ValidateToken(email, token)) {
      if (password) {
        if (password !== confirmPassword) {
          error = '¡Las contraseñas no coinciden!'
          setPassword('')
          setConfirmPassword('')
        } else if (password.length < 8) {
          error = '¡Contraseña demasiado corta!'
        }
      } else {
        error = '¡Tienes que introducir una contraseña!'
      }
    } else {
      error = '¡Token no válido!'
    }

    if (error) {
      console.log(error)
      toast.warning(<ToastError msg={error} />)
    } else {
      recoverPassword('Users', { email, password })
      toast.success(<ToastContent />)
      history.push('/')
    }
  }

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
              Reiniciar Contraseña 🔒
            </CardTitle>
            <Form className='auth-reset-password-form mt-2' onSubmit={handleSubmit}>
              <FormGroup>
                <Label className='form-label' for='new-password'>
                  Nueva contraseña
                </Label>
                <InputPassword onChange={(i) => setPassword(i.target.value)} value={password} className='input-group-merge' id='new-password' autoFocus />
              </FormGroup>
              <FormGroup>
                <Label className='form-label' for='confirm-password'>
                  Confirmar contraseña
                </Label>
                <InputPassword className='input-group-merge' onChange={(i) => setConfirmPassword(i.target.value)} value={confirmPassword} id='confirm-password' />
              </FormGroup>
              <PasswordStrengthBar minLength="8" shortScoreWord="Demasiado corta" scoreWords={['Débil', 'Floja', 'Media', 'Buena', 'Fuerte']} password={password} />
              <button className="form-control btn btn-outline-primary" color='primary' onClick={generatePass}>Generar contraseña</button>
              <hr />
              <Button.Ripple color='primary' block type='submit'>
                Cambiar contraseña
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
}

export default ResetPassword
