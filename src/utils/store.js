import { applyMiddleware, compose } from 'redux'
import { createStore } from 'redux-dynamic-reducer'

import thunk from 'redux-thunk'
// import reducers from './reducers'

const configureStore = () => {
  const middlewares = [thunk]

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  return createStore({}, composeEnhancers(applyMiddleware(...middlewares)))
}

export default configureStore
