import React, { Component } from 'react';
import TestForm from 'modules/Test/TestForm';

import { Route } from 'react-router'

class Test extends Component {

  render() {
    return (
      <div>
        <Route exact path='/:testId' component={(props) => {
          console.log("TUTAJ");

          return (
            <TestForm
              {...props}
              mode={TestForm.MODES.EDIT}
            />
          );
        }}
        />
        <Route exact path='/' component={TestForm}/>
      </div>
    );
  }
}

export default Test;
