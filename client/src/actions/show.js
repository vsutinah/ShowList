import {
	RECOMMENDATIONS_LOADED,
	RECOMMENDATION_LOADED,
	RECOMMENDATIONS_ERROR,
} from './types';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

// Load user's recommendations
export const loadRecommendations = () => async (dispatch) => {
	// If token exists in local storage (user is authenticated), set auth token in request header
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get('/api/shows');

		dispatch({
			type: RECOMMENDATIONS_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: RECOMMENDATIONS_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};

// Load user's specific recommendation using selected recommendation/show ID
export const loadRecommendation = (showId) => async (dispatch) => {
	// If token exists in local storage (user is authenticated), set auth token in request header
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}

	try {
		const res = await axios.get(`/api/shows/${showId}`);

		dispatch({
			type: RECOMMENDATION_LOADED,
			payload: res.data,
		});
	} catch (error) {
		dispatch({
			type: RECOMMENDATIONS_ERROR,
			payload: {
				msg: error.response.statusText,
				status: error.response.status,
			},
		});
	}
};
