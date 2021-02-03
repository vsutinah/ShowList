import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Alert } from 'react-bootstrap';

// Alert Component generated if SET_ALERT action exists
const CustomAlert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert) => (
		<Alert key={alert.id} variant={alert.alertType} className='mt-3'>
			{alert.msg}
		</Alert>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(CustomAlert);
