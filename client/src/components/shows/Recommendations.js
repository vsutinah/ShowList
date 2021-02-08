import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

const Recommendations = (props) => {
	return (
		<div>
			<h1 className='my-3'>My Recommendations</h1>
			<div className='d-flex flex-column justify-content-center'>
				<Card>
					<Card.Header>Recommendation 1</Card.Header>
					<Card.Body>Recommendation 1 Details</Card.Body>
				</Card>
				<Card>
					<Card.Header>Recommendation 2</Card.Header>
					<Card.Body>Recommendation 2 Details</Card.Body>
				</Card>
				<Card>
					<Card.Header>Recommendation 3</Card.Header>
					<Card.Body>Recommendation 3 Details</Card.Body>
				</Card>
			</div>
		</div>
	);
};

Recommendations.propTypes = {};

const mapStateToProps = (state) => ({});

export default Recommendations;
