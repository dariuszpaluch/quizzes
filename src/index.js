import 'core-js/es6/map';
import 'core-js/es6/set';

require('es6-promise/auto');
require('isomorphic-fetch');

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const render = Component =>
  ReactDOM.render(
    <Component />,
    document.getElementById('app')
  );

render(App);