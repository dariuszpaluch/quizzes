import React, { Component } from 'react';

import { Route } from 'react-router'
import TestForm from "modules/Tests/TestForm";
import TestList from 'modules/Tests/TestList';
import MainLayout from 'modules/MainLayout/MainLayout';

class Test extends Component {

  render() {
    const {
      match
    } = this.props;

    const routes = [

    ];
    return [
      <Route key='tests' exact path={`${match.path}/`} component={TestList}/>,
      <Route key='tests-add' path={`${match.path}/add`} component={TestForm}/>,
      <Route key='test-edit' path={`${match.path}/quizzId:/edit`} component={(props) => <TestForm mode={TestForm.modes.EDIT} {...props} />}/>,
    ];
  }
}

export default Test;
