import {
	RECOMMENDATIONS_LOADED,
	RECOMMENDATION_LOADED,
	RECOMMENDATIONS_ERROR,
	ADD_RECOMMENDATION,
} from './types';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import axios from 'axios';

const instance = axios.create({
	baseURL:
		process.env.NODE_ENV === 'development'
			? 'http://localhost:5000'
			: 'http://example.com',
});

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

// Add new recommendation for target user
export const addRecommendation = (formData) => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	console.log(localStorage.token);
	// Set necessary req header
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	console.log(formData);
	try {
		const res = await instance.post('/api/shows/', formData, config);

		dispatch({
			type: ADD_RECOMMENDATION,
			payload: res.data, // Payload contains data from response
		});

		dispatch(setAlert('Recommendation added successfully', 'success'));
	} catch (e) {
		dispatch({
			type: RECOMMENDATIONS_ERROR,
			payload: { msg: e.response.statusText, status: e.response.status },
		});
	}
};
