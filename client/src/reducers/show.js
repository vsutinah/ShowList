import {
	RECOMMENDATIONS_ERROR,
	RECOMMENDATION_LOADED,
	RECOMMENDATIONS_LOADED,
	ADD_RECOMMENDATION,
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
		case RECOMMENDATION_LOADED:
			return { ...state, recommendation: payload, loading: false };
		case RECOMMENDATIONS_ERROR:
			return { ...state, error: payload, loading: false };
		case ADD_RECOMMENDATION:
			return {
				...state,
				recommendations: [payload, ...state.recommendations],
				loading: false,
			};
		default:
			return state;
	}
}
