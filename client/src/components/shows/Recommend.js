import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { addRecommendation } from '../../actions/show';

const Recommend = ({ auth: { loading }, addRecommendation }) => {
	const [formData, setFormData] = useState({
		// Initial states
		title: '',
		type: '',
		description: '',
		targetUser: '',
	});

	const { title, type, description, targetUser } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		addRecommendation(formData);
	};

	return loading ? (
		<Spinner />
	) : (
		<div>
			<h1 className='my-3 text-center'>Recommend</h1>
			<Card>
				<Card.Body>
					<Form onSubmit={(e) => onSubmit(e)}>
						<Form.Group controlId='title'>
							<Form.Label>Title</Form.Label>
							<Form.Control
								type='text'
								placeholder='Title'
								name='title'
								value={title}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Form.Group controlId='type'>
							<Form.Label>Type</Form.Label>
							<Form.Control
								type='text'
								placeholder='Type'
								name='type'
								value={type}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>

						<Form.Group controlId='description'>
							<Form.Label>Description</Form.Label>
							<Form.Control
								as='textarea'
								cols='30'
								rows='5'
								placeholder='Description'
								name='description'
								value={description}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Form.Group controlId='targetUser'>
							<Form.Label>Recommend To:</Form.Label>
							<Form.Control
								type='text'
								name='targetUser'
								value={targetUser}
								onChange={(e) => onChange(e)}
								required
							/>
						</Form.Group>
						<Button variant='primary' type='submit'>
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</div>
	);
};

Recommend.propTypes = {
	auth: PropTypes.object.isRequired,
	addRecommendation: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { addRecommendation })(Recommend);
