import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import {toastr} from 'react-redux-toastr'

import { fetchTestToBeCompleted, saveTestAnswers, setQuestionAnswer, onChangeQuestionRate } from 'modules/MakeTest/utils/actions';
import TestStartView from 'modules/MakeTest/components/TestStartView/TestStartView';
import {
  getIsFetching, getQuestions, getQuestionsIds, getTestAnswers,
  getTestDescription, getQuestionRating,
} from 'modules/MakeTest/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import Loading from 'libs/ui/Loading/Loading';
import MakeTestForm from 'modules/MakeTest/components/MakeTestForm/MakeTestForm';
import TestSummary from 'modules/MakeTest/components/TestSummary/TestSummary';
import messages from 'modules/MakeTest/utils/messages';
import paths from 'consts/paths';
import { injectIntl } from 'react-intl';
import TestResult from 'modules/MakeTest/components/TestResult/TestResult';

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
    this.onSave();
  };

  onSave = () => {
    const { history, intl, answers, testId } = this.props;

    const onSuccess = (data) => {
      this.setState({
        questionsWithCorrect: data.questions,
        result: data.result,
      });

      toastr.success(intl.formatMessage(messages.TEST_SAVE_SUCCESS_TOASTR));
      this.changeViewState(STATES.SUMMARY);
    };

    const onFailure = () => {
      toastr.error(intl.formatMessage(messages.TEST_SAVE_FAILURE_TOASTR))
    };

    this.props.saveTestAnswers(testId, answers, onSuccess, onFailure);
  };

  onChangeAnswer = (questionId, answers) => {
    this.props.onChangeQuestionAnswer(questionId, answers);
  };

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
    const { questionsIds, questions, testDescription, answers, questionsRating } = this.props;

    return (
      <MakeTestForm
        questionsIds={questionsIds}
        questions={questions}
        testName={testDescription.name}
        values={answers}
        onChangeQuestionAnswer={this.onChangeAnswer}
        onChangeQuestionRate={this.props.onChangeQuestionRate}
        onFinish={this.finishTest}
        rating={questionsRating}
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

  renderTestResult() {

    const { questionsWithCorrect, result} = this.state;
    const { answers } = this.props;

    return (
      <TestResult
        questions={questionsWithCorrect}
        result={result}
        answers={answers}
      />
    )
  }

  renderContent() {
    switch (this.state.viewState) {
      case STATES.START:
        return this.renderStartView();
      case STATES.ANSWER:
        return this.renderTestForm();
      case STATES.SUMMARY: {
        return this.renderTestResult();
      }
        // return this.renderTestSummary();
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
    questionsRating: getQuestionRating(state),
  }
};

const mapDispatchToProps = {
  fetchTestToBeCompleted,
  saveTestAnswers,
  onChangeQuestionAnswer: setQuestionAnswer,
  onChangeQuestionRate
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MakeTest));