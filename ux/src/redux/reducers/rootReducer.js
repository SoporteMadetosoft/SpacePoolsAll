// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from '@auth/redux/reducer'
import navbar from './navbar'
import layout from './layout'

import registrosReducer from './custom'

import normalForm from './normalForm'
import selectReducer from './selects'

import fileUpload from './fileUpload'
import poolsReducer from './pools'
import canvasReducer from './canvas'

const rootReducer = combineReducers({
  auth,
  navbar,
  layout,
  registrosReducer,
  normalForm,
  selectReducer,
  fileUpload,
  poolsReducer,
  canvasReducer
})

export default rootReducer
