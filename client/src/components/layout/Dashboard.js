import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { loadRecommendations } from '../../actions/show';

const Dashboard = ({
	isAuthenticated,
	user,
	loadRecommendations,
	show: { recommendations },
}) => {
	// Redirect to login page if not logged in
	// if (!isAuthenticated) {
	// 	return <Redirect to='/login' />;
	// }
	useEffect(() => {
		loadRecommendations();
	}, [loadRecommendations]);

	let newRecommendations = recommendations.filter(
		(recommendation) => recommendation.date > user.lastLogin
	);

	return (
		<div>
			<h1 className='my-3'>Welcome, {user && user.name}</h1>
			<Button variant='light'>
				<b>Edit Profile</b>
			</Button>
			<h2 className='my-3'>
				You have {newRecommendations.length} new recommendations.
			</h2>

			{newRecommendations.map((recommendation) => (
				<Card>
					<Card.Header>
						<Link to={`/recommendations/${recommendation._id}`}>
							{recommendation.title}
						</Link>
					</Card.Header>
					<Card.Footer className='text-muted'>
						Recommended by {recommendation.fromUser.name}
					</Card.Footer>
				</Card>
			))}

			<p className='my-3'>
				See all your recommendations <Link to='/recommendations'>here.</Link>
			</p>
		</div>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object,
	isAuthenticated: PropTypes.bool,
	show: PropTypes.object,
	loadRecommendations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
	show: state.show,
});

export default connect(mapStateToProps, { loadRecommendations })(Dashboard);
