import React, { Component } from 'react';
import QuestionForm from 'modules/Question/QuestionForm';

import { Route, Switch, withRouter } from 'react-router-dom';
import QuestionList from './QuestionList';
import EditQuestion from 'modules/Question/EditQuestion';

import { injectIntl } from 'react-intl';

import { questionPaths } from 'consts/paths';
import Card from 'libs/ui/Card/Card';

class Question extends Component {
  render() {
    const { match, intl } = this.props;

    return (
      <Switch>
        <Route exact path={`${match.path}`} component={QuestionList} />
        <Route
          exact
          path={`${match.path}${questionPaths.ADD_QUESTION}`}
          render={() => (
            <Card>
              <QuestionForm />
            </Card>
          )}
        />
        <Route
          exact
          path={`${match.path}${questionPaths.EDIT_QUESTION}`}
          component={EditQuestion}
        />
      </Switch>
    );
  }
}

export default withRouter(injectIntl(Question));
