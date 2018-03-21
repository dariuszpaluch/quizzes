import React, { Component } from 'react';

import { Route } from 'react-router'
import TestForm from "modules/Tests/TestForm";

class Test extends Component {

  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <Route path={`${match.path}/add`} component={TestForm}/>
        <Route path={`${match.path}/quizzId:/edit`} component={(props) => <TestForm mode={TestForm.modes.EDIT} {...props} />}/>
      </div>
    );
  }
}

export default Test;
