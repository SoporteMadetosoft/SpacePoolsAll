// ** Logo
import logo from '@src/assets/images/logo/logo.png'

const SpinnerComponent = () => {
  return (
    <div className='fallback-spinner vh-100 '>
      <img className='center-fallback fallback-logo' src={logo} alt='logo' />
      <div className='center-fallback loading'>
        <div className='effect-1 effects'></div>
        <div className='effect-2 effects'></div>
        <div className='effect-3 effects'></div>
      </div>
    </div>
  )
}

export default SpinnerComponent
