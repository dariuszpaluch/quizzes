import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

require('es6-promise/auto');
require('isomorphic-fetch');

ReactDOM.render(<App />, document.getElementById('app'));