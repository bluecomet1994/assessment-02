import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import items from './reducers';

const store = createStore(
  combineReducers({ items }),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;