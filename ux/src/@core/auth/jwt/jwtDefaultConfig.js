// ** Auth Endpoints
export default {
  loginEndpoint: `${process.env.REACT_APP_HOST_URI}/auth/login`,
  // registerEndpoint: `${process.env.REACT_APP_HOST_URI}/jwt/register`,
  refreshEndpoint: `${process.env.REACT_APP_HOST_URI}/auth/refreshToken`,
  logoutEndpoint: `${process.env.REACT_APP_HOST_URI}/auth/logout`,

  // ** This will be prefixed in authorization header with token
  // ? e.g. Authorization: Bearer <token>
  tokenType: 'Bearer',

  // ** Value of this property will be used as key to store JWT token in storage
  storageTokenKeyName: 'accessToken'
}
