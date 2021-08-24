import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadRecommendations } from '../../actions/show';
import { Spinner } from '../../components/layout/Spinner';

const Recommendations = ({
	loadRecommendations,
	show: { loading, recommendations },
}) => {
	useEffect(() => {
		loadRecommendations();
	}, [loadRecommendations]);

	return loading || recommendations === null ? (
		<Spinner />
	) : (
		<div>
			<h1 className='my-3 text-center'>My Recommendations</h1>
			<div className='d-flex flex-column justify-content-center'>
				{recommendations.map((recommendation) => (
					<Card key={recommendation._id}>
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
	loadRecommendations: PropTypes.func.isRequired,
	show: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	show: state.show,
});

export default connect(mapStateToProps, { loadRecommendations })(
	Recommendations
);
