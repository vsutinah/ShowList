// Root reducer
import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import show from './show';

export default combineReducers({ alert, auth });
