import React, { Fragment } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Header = ({ auth: { isAuthenticated, loading }, logout }) => {
	const authLinks = (
		<Nav className='ml-auto mr-3'>
			<Nav.Link href='/recommend'>Recommend</Nav.Link>
			<Nav.Link href='/dashboard'>My Profile</Nav.Link>
			<Nav.Link onClick={logout}>Logout</Nav.Link>
		</Nav>
	);

	const guestLinks = (
		<Nav className='ml-auto mr-3'>
			<Nav.Link href='/login'>Login</Nav.Link>
			<Nav.Link href='/register'>Register</Nav.Link>
		</Nav>
	);

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' fixed='top'>
				<Navbar.Brand className='ml-5' href='/'>
					ShowList
				</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					{!loading && (
						<Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
					)}
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

// If-else condition to switch between authLinks and guestLinks

Header.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Header);
