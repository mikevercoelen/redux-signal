import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import SignalContainer from './containers/SignalContainer'
import SignalOverlay from './containers/SignalOverlayContainer'
import App from './App'
import './index.scss'

const store = createStore(
  rootReducer,
  {},
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const rootElement = document.getElementById('root')

render(
  <Provider store={store}>
    <div>
      <SignalContainer />
      <SignalOverlay />
      <App />
    </div>
  </Provider>,
  rootElement
)
