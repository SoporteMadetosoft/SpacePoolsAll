// ** Redux Imports
import { combineReducers } from 'redux'

// ** Reducers Imports
import auth from '@auth/redux/reducer'
import navbar from './navbar'
import layout from './layout'

import form from './form'

import registrosReducer from './custom'

import normalForm from './normalForm'
import selectReducer from './selects'

const rootReducer = combineReducers({
  registrosReducer,
  form,
  auth,
  navbar,
  layout,
  normalForm,
  selectReducer
})

export default rootReducer
