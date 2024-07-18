import { createStore, applyMiddleware } from 'redux';
import ticketReducer from '../features/ticketReducer';
import {thunk} from 'redux-thunk';

const store = createStore(ticketReducer, applyMiddleware(thunk));

export default store;
