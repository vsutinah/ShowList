import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => {
	const authLinks = (
		<Nav className='ml-auto mr-3'>
			<Link>Recommend</Link>
			<Link>My Profile</Link>
			<Link>Logout</Link>
		</Nav>
	);

	const guestLinks = (
		<Nav className='ml-auto mr-3'>
			<Link>Login</Link>
			<Link>Register</Link>
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
					<Nav className='ml-auto mr-3'>
						<Nav.Link href='/login'>Login</Nav.Link>
						<Nav.Link href='/register'>Register</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</header>
	);
};

// If-else condition to switch between authLinks and guestLinks
// { !loading && (<Fragment>{ isAuthenticated ? authLinks : guestLinks }</Fragment>) }

export default Header;
