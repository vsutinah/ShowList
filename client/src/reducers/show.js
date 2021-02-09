import {
	RECOMMENDATIONS_ERROR,
	RECOMMENDATIONS_LOADED,
} from '../actions/types';

const initialState = {
	recommendations: [], // For all recommendations of a user
	recommendation: null, // Specific recommendation from the list of recommendations
	loading: true,
	error: {},
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case RECOMMENDATIONS_LOADED:
			return { ...state, recommendations: payload, loading: false };
		case RECOMMENDATIONS_ERROR:
			return { ...state, error: payload, loading: false };
		default:
			return state;
	}
}
