import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadRecommendation } from '../../actions/show';
import { Spinner } from '../layout/Spinner';

const Recommendation = ({
	loadRecommendation,
	show: { recommendation, loading },
	match,
}) => {
	useEffect(() => {
		loadRecommendation(match.params.id);
	}, [loadRecommendation, match.params.id]);

	return loading || recommendation === null ? (
		<Spinner />
	) : (
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
	loadRecommendation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	show: state.show,
});

export default connect(mapStateToProps, { loadRecommendation })(Recommendation);
