import React, { Component } from 'react';
import TestForm from 'modules/Test/TestForm';

import { Route } from 'react-router'
import TestList from "./TestList";

class Test extends Component {

  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <Route exact path={`${match.path}`} component={TestList}/>
        <Route exact path={`${match.path}/add`} component={TestForm}/>
        <Route exact path={`${match.path}/:testId`} component={(props) => {
          return (
            <TestForm
              {...props}
              mode={TestForm.MODES.EDIT}
            />
          );
        }}
        />
      </div>
    );
  }
}

export default Test;
