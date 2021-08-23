import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, ListGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Spinner } from '../layout/Spinner';
import { addRecommendation } from '../../actions/show';
import { loadUsers } from '../../actions/auth';

const Recommend = ({
	auth: { loading },
	form: { users },
	addRecommendation,
	loadUsers,
}) => {
	useEffect(() => {
		loadUsers();
	}, [loadUsers]);

	// State for form fields
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

	const onClick = (e) => {
		setFormData({ ...formData, [targetUser]: e.target.outerText });
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		addRecommendation(formData);
	};

	const filteredUsers = users.filter((user) =>
		user.name.toLowerCase().includes(targetUser)
	);

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
								placeholder='Search for the user to recommend to'
								name='targetUser'
								value={targetUser}
								onChange={(e) => onChange(e)}
								required
							></Form.Control>
							<ListGroup>
								{targetUser !== ''
									? filteredUsers.map((user) => (
											<ListGroup.Item
												onClick={(e) => onClick(e)}
												key={user._id}
											>
												{user.name}
											</ListGroup.Item>
									  ))
									: ''}
							</ListGroup>
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
	form: PropTypes.object.isRequired,
	addRecommendation: PropTypes.func.isRequired,
	loadUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
	form: state.form,
});

export default connect(mapStateToProps, { addRecommendation, loadUsers })(
	Recommend
);
