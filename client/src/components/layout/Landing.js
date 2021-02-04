import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Landing = ({ isAuthenticated }) => {
	if (isAuthenticated) {
		return <Redirect to='/dashboard' />;
	}

	return (
		<div>
			<section className='landing'>
				<div className='text-center landing-prompt'>
					<div>
						<h1>Show List</h1>
						<p>
							Send recommendations of TV shows, books or even games to your
							friends with this app!
						</p>
						<div>
							<Link to='/register' className='btn btn-primary mx-2'>
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

Landing.propTypes = {
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {})(Landing);
