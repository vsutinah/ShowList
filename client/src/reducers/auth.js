import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
} from '../actions/types';

const initialState = {
	token: localStorage.getItem('token'),
	isAuthenticated: null,
	loading: true,
	user: null,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	// Action contains payload w/ data and the type (which is what we'll evaluate)
	const { type, payload } = action;

	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			// Set token if registration is successful (login instantly)
			localStorage.setItem('token', payload.token);
			return { ...state, ...payload, isAuthenticated: true, loading: false };
		case REGISTER_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
		case LOGOUT:
			// Remove token if registration is unsuccessful
			localStorage.removeItem('token');
			return { ...state, token: null, isAuthenticated: false, loading: false };
		default:
			return state;
	}
}
