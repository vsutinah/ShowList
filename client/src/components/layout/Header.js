import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';

const Header = () => {
	const authLinks = (
		<Nav className='ml-auto mr-3'>
			<Nav.Link>Recommend</Nav.Link>
			<Nav.Link>My Profile</Nav.Link>
			<Nav.Link>Logout</Nav.Link>
		</Nav>
	);

	const guestLinks = (
		<Nav className='ml-auto mr-3'>
			<Nav.Link>Login</Nav.Link>
			<Nav.Link>Register</Nav.Link>
		</Nav>
	);

	return (
		<header>
			<Navbar bg='dark' variant='dark' expand='lg' fixed='top' className='mb-5'>
				<Navbar.Brand className='ml-5'>ShowList</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					<Nav className='ml-auto mr-3'>
						<Nav.Link>Login</Nav.Link>
						<Nav.Link>Register</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

// If-else condition to switch between authLinks and guestLinks
// { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }

export default Header;
