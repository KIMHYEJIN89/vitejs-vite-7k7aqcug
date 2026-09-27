import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers';

let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)) // 개발자도구 redux tool
);

export default store;
