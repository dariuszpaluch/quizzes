import React, { Component } from 'react';
import QuestionForm from 'modules/Question/QuestionForm';

import { Route, Switch } from 'react-router-dom'
import QuestionList from './QuestionList';
import EditQuestion from 'modules/Question/EditQuestion';
import messages from './utils/messages';
import MainLayout from 'modules/MainLayout/MainLayout';
import { injectIntl } from 'react-intl';

import { questionPaths } from 'consts/paths';

class Question extends Component {

  render() {
    const {
      match,
      intl,
    } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}`} component={QuestionList}/>
        <Route exact path={`${match.path}${questionPaths.ADD_QUESTION}`} component={QuestionForm}/>
        <Route exact path={`${match.path}${questionPaths.EDIT_QUESTION}`} component={EditQuestion}/>
      </Switch>
    );
  }
}

export default injectIntl(Question);
