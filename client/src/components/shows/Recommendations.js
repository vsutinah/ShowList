import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { loadRecommendations } from '../../actions/show';

const Recommendations = ({
	isAuthenticated,
	loadRecommendations,
	recommendations,
}) => {
	// Redirect to login page if not logged in
	// if (!isAuthenticated) {
	// 	return <Redirect to='/login' />;
	// }

	useEffect(() => {
		loadRecommendations();
	}, [loadRecommendations]);

	return (
		<div>
			<h1 className='my-3'>My Recommendations</h1>
			<div className='d-flex flex-column justify-content-center'>
				{recommendations.map((recommendation) => (
					<Card>
						<Card.Header>
							<Link to={`/recommendations/${recommendation._id}`}>
								{recommendation.title}
							</Link>
						</Card.Header>
						<Card.Body>
							<Card.Text>{recommendation.description}</Card.Text>
						</Card.Body>
						<Card.Footer className='text-muted'>
							Recommended by {recommendation.fromUser.name}
						</Card.Footer>
					</Card>
				))}
			</div>
		</div>
	);
};

Recommendations.propTypes = {
	isAuthenticated: PropTypes.bool,
	loadRecommendations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	recommendations: state.show.recommendations,
});

export default connect(mapStateToProps, { loadRecommendations })(
	Recommendations
);
