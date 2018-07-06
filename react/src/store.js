import { createStore, applyMiddleware, compose } from 'redux';
import reducer from 'reducer/root';
import * as action from 'actions/rootActions';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer, composeEnhancers(applyMiddleware(
    ...action
)));

export default store;