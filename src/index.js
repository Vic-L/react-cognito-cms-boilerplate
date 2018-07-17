import '_stylesheets/main.sass'

import React from 'react'
import { compose, createStore, applyMiddleware } from 'redux'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from  'react-redux'
import createSagaMiddleware from 'redux-saga'

import rootReducers from '_reducers'

import App from '_components/App'

import WebFont from 'webfontloader'

import axios from 'axios'

axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common["Accept"] = "application/json"

import sagas from './sagas'

const middlewares = [];
 
if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`)
  middlewares.push(logger)
}

const sagaMiddleware = createSagaMiddleware()
middlewares.push(sagaMiddleware)
 
const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducers)

sagaMiddleware.run(sagas)

WebFont.load({
  google: {
    families: ['Lato']
  }
})

render((
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
), document.getElementById("app"))