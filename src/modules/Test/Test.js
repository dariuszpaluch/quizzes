import React, { Component } from 'react';
import TestForm from 'modules/Test/TestForm';

import { Route } from 'react-router'

class Test extends Component {

  render() {
    console.log(this.props);
    const {
      match
    } = this.props;

    return (
      <div>
        <Route exact path={`${match.path}/:testId`} component={(props) => {


          return (
            <TestForm
              {...props}
              mode={TestForm.MODES.EDIT}
            />
          );
        }}
        />
        <Route exact path={match.path} component={TestForm}/>
      </div>
    );
  }
}

export default Test;
