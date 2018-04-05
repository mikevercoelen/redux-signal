import { combineReducers } from 'redux'
import { reducer as signalReducer } from '../src/index'

const rootReducer = combineReducers({
  signal: signalReducer
})

export default rootReducer
