import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Landing = (props) => {
	return (
		<div>
			<section className='my-5'>
				<div>
					<div className='d-flex flex-column align-items-center justify-content-center text-center position-relative'>
						<h1>Show List</h1>
						<p>
							Send recommendations of TV shows, books or even games to your
							friends with this app!
						</p>
						<div>
							<Link to='/register' className='btn btn-primary'>
								Sign Up
							</Link>
							<Link to='/login' className='btn btn-light'>
								Login
							</Link>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

Landing.propTypes = {};

export default Landing;