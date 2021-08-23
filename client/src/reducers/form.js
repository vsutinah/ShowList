import { USERS_LOADED, AUTH_ERROR } from '../actions/types';

const initialState = {
	users: [],
	error: {},
	loading: true,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case USERS_LOADED:
			return { ...state, users: payload, loading: false };
		case AUTH_ERROR:
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
}
