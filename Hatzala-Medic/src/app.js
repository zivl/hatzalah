import React from 'react';
import { Router, Route } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import MedicApp from './MedicApp';

import injectTapEventPlugin from 'react-tap-event-plugin';

export default
class App extends React.Component {
	render() {
        //Needed for onTouchTap
        //Can go away when react 1.0 release
        //Check this repo:
        //https://github.com/zilverline/react-tap-event-plugin
        injectTapEventPlugin();

		return (
			<Router history={history}>
                <Route path="/" component={MedicApp}></Route>
			</Router>
		);
	}
}