import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

const Register = (props) => {
	const [formData, setFormData] = useState({
		// Initial states
		name: '',
		email: '',
		password: '',
		password2: '',
	});

	const { name, email, password, password2 } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log('Passwords do not match!');
		} else {
			const newUser = {
				name,
				email,
				password,
			};

			try {
				const config = {
					headers: {
						'Content-Type': 'application/json',
					},
				};

				const body = JSON.stringify(newUser);

				const res = await axios.post('/api/users', body, config);
				console.log(res.data); // Token
			} catch (error) {
				console.log(error.response.data);
			}
		}
	};

	return (
		<div>
			<h1>Register</h1>
			<Form onSubmit={(e) => onSubmit(e)}>
				<Form.Group controlId='name'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						type='text'
						placeholder='Name'
						name='name'
						value={name}
						onChange={(e) => onChange(e)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='email'>
					<Form.Label>Email address</Form.Label>
					<Form.Control
						type='email'
						placeholder='Email'
						name='email'
						value={email}
						onChange={(e) => onChange(e)}
						required
					/>
					<Form.Text className='text-muted'>
						We'll never share your email with anyone else.
					</Form.Text>
				</Form.Group>

				<Form.Group controlId='password'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Password'
						name='password'
						value={password}
						onChange={(e) => onChange(e)}
						required
					/>
				</Form.Group>
				<Form.Group controlId='password2'>
					<Form.Label>Password</Form.Label>
					<Form.Control
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
						onChange={(e) => onChange(e)}
						required
					/>
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

Register.propTypes = {};

export default Register;
