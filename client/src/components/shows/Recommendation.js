import React from 'react';
import PropTypes from 'prop-types';

const Recommendation = (props) => {
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

Recommendation.propTypes = {};

const mapStateToProps = (state) => ({});

export default Recommendation;
