import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import Test from './Test';

export default
class App extends React.Component {
	render() {
		return (
			<Router history={history}>
				<Route path="/" component={Test}></Route>
			</Router>
		);
	}
}