import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as actions from './actions';
import combinedReducer from './reducers';

export default createStore(combinedReducer, applyMiddleware(thunk));
export { actions };
