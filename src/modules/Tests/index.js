import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import TestDetail from 'modules/Tests/TestDetail';

import Tests from './Tests';
import TestsSearchToComplete from './TestsSearchToComplete';

import { testsPaths } from 'consts/paths';
import TestEdit from 'modules/Tests/TestEdit';
import AddTest from 'modules/Tests/AddTest';

export default class extends Component {
  render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route
          exact
          path={`${match.path}${testsPaths.SEARCH_TESTS}`}
          component={TestsSearchToComplete}
        />
        <Route exact path={`${match.path}${testsPaths.TEST_ADD}`} component={AddTest} />
        <Route exact path={`${match.path}${testsPaths.TEST}${testsPaths.TEST_EDIT}`} component={TestEdit} />
        <Route exact path={`${match.path}${testsPaths.TEST}`} component={TestDetail} />
        <Route exact path={match.path} component={Tests} />
      </Switch>
    );
  }
}
