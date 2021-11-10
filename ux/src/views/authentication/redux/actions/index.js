// ** UseJWT import to get config
import useJwt from '@src/auth/jwt/useJwt'
import { types } from '../types'


const config = useJwt.jwtConfig

// ** Handle User Login
export const handleLogin = data => {
  return dispatch => {
    dispatch({
      type: types.login,
      data,
      config,
      [config.storageTokenKeyName]: data[config.storageTokenKeyName]
    })

    // ** Add to user, accessToken & refreshToken to localStorage
    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem(config.storageTokenKeyName, JSON.stringify(data.accessToken))
  }
}

// ** Handle User Logout
export const handleLogout = () => {
  return dispatch => {
    dispatch({ type: types.logout, [config.storageTokenKeyName]: null })

    // ** Remove user, accessToken & refreshToken from localStorage
    localStorage.removeItem('userData')
    localStorage.removeItem(config.storageTokenKeyName)
  }
}
