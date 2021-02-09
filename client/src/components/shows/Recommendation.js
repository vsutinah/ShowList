import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Recommendation = ({ isAuthenticated }) => {
	// Redirect to login page if not logged in
	// if (!isAuthenticated) {
	// 	return <Redirect to='/login' />;
	// }

	return (
		<div>
			<h1>Recommendation 1</h1>
			<h2>Description</h2>
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
				animi, natus a beatae neque nulla consectetur dicta quis excepturi
				explicabo praesentium. Fuga aspernatur velit, error atque vel saepe
				eveniet accusamus?
			</p>
			<h3>Recommended by User</h3>
		</div>
	);
};

Recommendation.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Recommendation);
