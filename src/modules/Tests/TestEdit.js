import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import QuestionForm, { MODES } from 'modules/Tests/TestForm';
import {
  getQuestion,
  getQuestionIsLoading,
  getQuestionLoading
} from 'modules/Question/utils/getters';
import paths from 'consts/paths';

import { pick, map } from 'lodash';
import Card from 'libs/ui/Card/Card';
import messages from 'modules/Tests/utils/messages';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import Loading from 'libs/ui/Loading/Loading';
import { getTest } from 'modules/Tests/utils/getters';
import TestForm from 'modules/Tests/TestForm';
import { getTestDetail, saveTest } from 'modules/Tests/utils/actions';

class EditQuestion extends Component {
  componentWillMount() {
    const { testId } = this.props;
    this.props.fetchTest(testId);
  }

  onSave = data => {
    const { testId } = this.props;
    return this.props.saveTest(testId, data, data => {
       this.props.history.push(paths.TESTS);
    });
  };

  getInitValues() {
    const { name, description, questions} = this.props.test;

    return {
      name,
      description,
      questionsIds: questions.map( question => question.id)
    }
  }

  render() {
    const { loading, test, intl } = this.props;

    if (loading) return <Loading center />;

    return (
      <div className="row center-xs no-space-xs">
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-7">
          <Card className="add-question">
            <TestForm
              mode={MODES.EDIT}
              test={test}
              onSave={this.onSave}
              initialValues={this.getInitValues()}
            />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const testId = ownProps.match.params.testId;
  const test = getTest(state, testId);

  return {
    test,
    testId,
    loading: !test,
  };
};

const mapDispatchToProps = {
  fetchTest: getTestDetail,
  saveTest,
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(EditQuestion);
