import React from 'react';
import ReactDOM from 'react-dom';

System.import('app').then(({default: App}) => {
	ReactDOM.render(React.createElement(App), document.getElementById('app'));
});
