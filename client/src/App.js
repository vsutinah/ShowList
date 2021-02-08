import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Alert from './components/layout/Alert';
import Landing from './components/layout/Landing';
import Dashboard from './components/layout/Dashboard';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Recommend from './components/shows/Recommend';
import Recommendation from './components/shows/Recommendation';
import Recommendations from './components/shows/Recommendations';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
// Redux
import { Provider } from 'react-redux'; // Connects React & Redux
import store from './store';

if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
	}, []);

	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Header />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Alert />
						<Switch>
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/dashboard' component={Dashboard} />
							<Route exact path='/recommend' component={Recommend} />
							<Route
								exact
								path='/recommendations'
								component={Recommendations}
							/>
							<Route
								exact
								path='/recommendations/:id'
								component={Recommendation}
							/>
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
