import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr'

import { fetchTestToBeCompleted, saveTestAnswers, setQuestionAnswer } from 'modules/MakeTest/utils/actions';
import TestStartView from 'modules/MakeTest/components/TestStartView/TestStartView';
import {
  getIsFetching, getQuestions, getQuestionsIds, getTestAnswers,
  getTestDescription
} from 'modules/MakeTest/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import Loading from 'libs/ui/Loading/Loading';
import MakeTestForm from 'modules/MakeTest/components/MakeTestForm/MakeTestForm';
import TestSummary from 'modules/MakeTest/components/TestSummary/TestSummary';
import messages from 'modules/MakeTest/utils/messages';
import paths from 'consts/paths';
import { injectIntl } from 'react-intl';

const STATES = {
  START: 0,
  ANSWER: 1,
  SUMMARY: 2,
};

class MakeTest extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      viewState: STATES.START,
    };
  }

  componentWillReceiveProps() {
  }

  componentWillMount() {
    this.props.fetchTestToBeCompleted(this.props.testId);
  }

  changeViewState = (viewState) => {
    this.setState({
      viewState,
    })
  };

  startTest = () => {
    this.changeViewState(STATES.ANSWER);
  };

  finishTest = () => {
    this.changeViewState(STATES.SUMMARY);
  };

  onSave = () => {
    const { history, intl, answers, testId } = this.props;

    const onSuccess = () => {
      toastr.success(intl.formatMessage(messages.TEST_SAVE_SUCCESS_TOASTR));
      history.push(paths.DASHBOARD);
    };

    const onFailure = () => {
      toastr.error(intl.formatMessage(messages.TEST_SAVE_FAILURE_TOASTR))
    };
    this.props.saveTestAnswers(testId, answers, onSuccess, onFailure);
  };

  onChangeAnswer = (questionId, answers) => {
    this.props.onChangeQuestionAnswer(questionId, answers);
  };
  questionsIds;

  renderStartView() {
    const { questionsIds, testDescription } = this.props;

    return (
      <TestStartView
        testDescription={testDescription}
        numberOfQuestions={questionsIds.length}
        onClickStart={this.startTest}
      />
    );
  }

  renderTestForm() {
    const { questionsIds, questions, testDescription, answers } = this.props;

    return (
      <MakeTestForm
        questionsIds={questionsIds}
        questions={questions}
        testName={testDescription.name}
        values={answers}
        onChangeQuestionAnswer={this.onChangeAnswer}
        onFinish={this.finishTest}
      />
    );
  }

  renderTestSummary() {
    const { questionsIds, questions, testDescription, answers } = this.props;

    return (
      <TestSummary
        questionsIds={questionsIds}
        questions={questions}
        testDescription={testDescription}
        userAnswers={answers}
        onSave={this.onSave}
        onBackToTest={this.changeViewState.bind(null, STATES.ANSWER)}
      />
    )
  }

  renderContent() {
    switch (this.state.viewState) {
      case STATES.START:
        return this.renderStartView();
      case STATES.ANSWER:
        return this.renderTestForm();
      case STATES.SUMMARY:
        return this.renderTestSummary();
    }
  }

  render() {
    const { loading, testDescription } = this.props;

    return (
      <MainLayout appBarTittle={testDescription && testDescription.name}>
        {loading ? <Loading center/> : this.renderContent()}
      </MainLayout>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const testId = ownProps.match.params.testId;

  const testDescription = getTestDescription(state);
  return {
    testId,
    testDescription,
    questionsIds: getQuestionsIds(state),
    questions: getQuestions(state),
    loading: getIsFetching(state) || !testDescription,
    answers: getTestAnswers(state),
  }
};

const mapDispatchToProps = {
  fetchTestToBeCompleted,
  saveTestAnswers,
  onChangeQuestionAnswer: setQuestionAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MakeTest));