import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import TestDetail from 'modules/Tests/TestDetail';
import TestForm from 'modules/Tests/TestForm';
import Tests from './Tests';
import TestsSearchToComplete from './TestsSearchToComplete';

import {testsPaths } from 'consts/paths';

export default class extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route key="tests" exact path={match.path} component={Tests} />
        <Route key="tests-search" exact path={`${match.path}${testsPaths.SEARCH_TESTS}`} component={TestsSearchToComplete} />
        <Route key="tests-add" exact path={`${match.path}${testsPaths.TEST_ADD}`} component={TestForm} />
        <Route key="test-edit" exact path={`${match.path}${testsPaths.TEST}`} component={TestDetail} />
      </Switch>
    );
  }
};
