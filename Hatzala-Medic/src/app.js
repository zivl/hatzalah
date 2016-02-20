import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import { history } from 'react-router/lib/BrowserHistory';
import MedicApp from './components/MedicApp';
import Topics from './components/Topics';

import injectTapEventPlugin from 'react-tap-event-plugin';

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();

ReactDOM.render(
    (
        <Router history={history}>
            <Route path="/medic" component={MedicApp}>
                <Route path="/topics" component={Topics}></Route>
            </Route>
            <Redirect from='/' to='/medic/topics'/>
        </Router>
    )
    , document.getElementById('app'));