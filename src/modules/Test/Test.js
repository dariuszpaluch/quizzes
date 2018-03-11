import React, { Component } from 'react';
import TestForm from 'modules/Test/TestForm';

import { Route } from 'react-router'
import TestList from "./TestList";
import EditTest from "modules/Test/EditTest";

class Test extends Component {

  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <Route exact path={`${match.path}`} component={TestList}/>
        <Route exact path={`${match.path}/add`} component={TestForm}/>
        <Route exact path={`${match.path}/:questionId/edit`} component={EditTest}/>
      </div>
    );
  }
}

export default Test;
