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
      </div>
    );
  }
}

export default Test;
