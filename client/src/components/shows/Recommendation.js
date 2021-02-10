import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadRecommendation } from '../../actions/show';

const Recommendation = ({
	isAuthenticated,
	loadRecommendation,
	recommendation,
	match,
}) => {
	// Redirect to login page if not logged in
	// if (!isAuthenticated) {
	// 	return <Redirect to='/login' />;
	// }

	useEffect(() => {
		loadRecommendation(match.params.id);
	}, [loadRecommendation, match.params.id]);

	return (
		<div>
			<Link to='/recommendations' className='btn btn-light my-3'>
				Back to Recommendations
			</Link>
			<h1>{recommendation.title}</h1>
			<h5>Type: {recommendation.type}</h5>
			<h5>Genres: -</h5>
			<h2>Description</h2>
			<p>{recommendation.description}</p>
			<h3>Recommended by {recommendation.fromUser.name}</h3>
		</div>
	);
};

Recommendation.propTypes = {
	isAuthenticated: PropTypes.bool,
	loadRecommendation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	recommendation: state.show.recommendation,
});

export default connect(mapStateToProps, { loadRecommendation })(Recommendation);
