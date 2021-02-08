import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Dashboard = ({ user: { name } }) => {
	return (
		<div>
			<h1 className='my-3'>{name}</h1>
			<Button variant='light'>
				<b>Edit Profile</b>
			</Button>
			<h2 className='my-3'>You have '_' new recommendations.</h2>
			<ul>
				<li>New recommendations go here</li>
			</ul>
			<p>
				See all your recommendations <Link>here.</Link>
			</p>
		</div>
	);
};

Dashboard.propTypes = {
	user: PropTypes.object,
};

const mapStateToProps = (state) => ({
	user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
