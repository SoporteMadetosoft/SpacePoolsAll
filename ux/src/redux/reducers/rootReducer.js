// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from '@auth/redux/reducer'
import navbar from './navbar'
import layout from './layout'

import registrosReducer from './custom'
import formValidator from './formValidator'

import normalForm from './normalForm'
import selectReducer from './selects'

import fileUpload from './fileUpload'

import ordersReducer from './orders'
import calenderReducer from './calendar'
import permisosReducer from './permisos'
import alertReducer from './alert'


const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  registrosReducer,
  normalForm,
  selectReducer,
  fileUpload,
  ordersReducer,
  calenderReducer,
  permisosReducer,
  formValidator,
  alertReducer
})

export default rootReducer
