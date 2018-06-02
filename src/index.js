import React from 'react';
import ReactDOM from 'react-dom';
import App, { AppWithHot } from './App';

require('es6-promise/auto');
require('isomorphic-fetch');

ReactDOM.render(module.hot ? <AppWithHot /> : <App />, document.getElementById('app'));
