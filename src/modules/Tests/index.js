import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import TestDetail from 'modules/Tests/TestDetail';
import TestForm from 'modules/Tests/TestForm';
import Tests from './Tests';

import {testsPaths } from 'consts/paths';

export default class extends Component {
  static VIEWS_DESCRIPTION = {
    INDEX: {
      querySearch: true,
      goBack: false,
    }
  };

  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route key="tests" exact path={match.path} component={Tests} />
        <Route key="tests-add" exact path={`${match.path}${testsPaths.TEST_ADD}`} component={TestForm} />
        <Route key="test-edit" exact path={`${match.path}${testsPaths.TEST}`} component={TestDetail} />
      </Switch>
    );
  }
};
