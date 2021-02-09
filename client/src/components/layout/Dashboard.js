import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Card } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';

const Dashboard = ({ isAuthenticated, user }) => {
	// Redirect to login page if not logged in
	// if (!isAuthenticated) {
	// 	return <Redirect to='/login' />;
	// }

	return (
		<div>
			<h1 className='my-3'>Welcome, {user && user.name}</h1>
			<Button variant='light'>
				<b>Edit Profile</b>
			</Button>
			<h2 className='my-3'>You have '_' new recommendations.</h2>

			<Card>
				<Card.Header>New Recommendation 1</Card.Header>
			</Card>
			<Card>
				<Card.Header>New Recommendation 2</Card.Header>
			</Card>

			<p className='my-3'>
				See all your recommendations <Link to='/recommendations'>here.</Link>
			</p>
		</div>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Dashboard);
