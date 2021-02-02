import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
// Redux
import { Provider } from 'react-redux'; // Connects React & Redux
import store from './store';

function App() {
	return (
		<Provider store={store}>
			<Router>
				<Fragment>
					<Header />
					<Route exact path='/' component={Landing} />
					<section className='container'>
						<Switch>
							<Route exact path='/login' component={Login} />
							<Route exact path='/register' component={Register} />
						</Switch>
					</section>
				</Fragment>
			</Router>
		</Provider>
	);
}

export default App;
