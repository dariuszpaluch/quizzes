import React, { Component } from 'react';
import QuestionForm from 'modules/Question/QuestionForm';

import { Route } from 'react-router'
import QuestionList from "./QuestionList";
import EditQuestion from "modules/Question/EditQuestion";

class Question extends Component {

  render() {
    const {
      match
    } = this.props;

    return (
      <div>
        <Route exact path={`${match.path}`} component={QuestionList}/>
        <Route exact path={`${match.path}/add`} component={QuestionForm}/>
        <Route exact path={`${match.path}/:questionId/edit`} component={EditQuestion}/>
      </div>
    );
  }
}

export default Question;
