import './tests.scss';

import React, { Component } from 'react';

import { Route, Switch } from 'react-router-dom';

import TestForm from "modules/Tests/TestForm";
import TestList from 'modules/Tests/TestList';
import TestDetail from 'modules/Tests/TestDetail';

class Test extends Component {

  render() {
    const {
      match
    } = this.props;

    return (
      <Switch>
        <Route key='tests' exact path={`${match.path}/`} component={TestList}/>,
        <Route key='tests-add' exact path={`${match.path}/add`} component={TestForm}/>,
        <Route key='test-edit' path={`${match.path}/:testId`} component={TestDetail}/>,
      </Switch>
    );
  }
}

export default Test;
