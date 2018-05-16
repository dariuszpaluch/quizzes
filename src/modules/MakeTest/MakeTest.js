import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import {
  fetchTestToBeCompleted,
  saveTestAnswers,
  setQuestionAnswer,
  onChangeQuestionRate,
  changeTestRating
} from 'modules/MakeTest/utils/actions';
import TestStartView from 'modules/MakeTest/components/TestStartView/TestStartView';
import {
  getIsFetching,
  getQuestions,
  getQuestionsIds,
  getTestAnswers,
  getTestDescription,
  getQuestionRating,
  getTestRating
} from 'modules/MakeTest/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import Loading from 'libs/ui/Loading/Loading';
import MakeTestForm from 'modules/MakeTest/components/MakeTestForm/MakeTestForm';
import TestSummary from 'modules/MakeTest/components/TestSummary/TestSummary';
import messages from 'modules/MakeTest/utils/messages';
import paths from 'consts/paths';
import { injectIntl } from 'react-intl';
import TestResult from 'modules/MakeTest/components/TestResult/TestResult';
import { MainLayoutContextWrapper } from 'modules/MainLayout/MainLayoutContext';
import randomizeArray from 'modules/MakeTest/utils/randomizeArray';

const STATES = {
  START: 0,
  ANSWER: 1,
  SUMMARY: 2
};

class MakeTest extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      viewState: STATES.START
    };
  }

  componentWillMount() {
    this.props.fetchTestToBeCompleted(this.props.testId);
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.testDescription.name !== nextProps.testDescription.name) {
      this.updateAppBar(nextProps);
    }
  }

  componentDidMount() {
    this.updateAppBar();
  }

  updateAppBar(props) {
    const { mainLayoutContext, testDescription } = props || this.props;
    if (!!mainLayoutContext) {
      const { setAppBarData } = mainLayoutContext;

      setAppBarData({
        title: testDescription && testDescription.name
      });
    }
  }

  changeViewState = viewState => {
    this.setState({
      viewState
    });
  };

  startTest = () => {
    this.changeViewState(STATES.ANSWER);
  };

  finishTest = () => {
    this.onSave();
  };

  onSave = () => {
    const { history, intl, answers, testId } = this.props;

    const onSuccess = data => {
      this.setState({
        questionsWithCorrect: data.questions,
        result: data.result
      });

      toastr.success(intl.formatMessage(messages.TEST_SAVE_SUCCESS_TOASTR));
      this.changeViewState(STATES.SUMMARY);
    };

    const onFailure = () => {
      toastr.error(intl.formatMessage(messages.TEST_SAVE_FAILURE_TOASTR));
    };

    this.props.saveTestAnswers(testId, answers, onSuccess, onFailure);
  };

  onChangeAnswer = (questionId, answers) => {
    this.props.onChangeQuestionAnswer(questionId, answers);
  };

  changeTestRating = testRating => {
    const { testId } = this.props;

    this.props.changeTestRating(testId, testRating);
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
    );
  }

  renderTestResult() {
    const { questionsWithCorrect, result } = this.state;
    const { answers, testRating } = this.props;

    return (
      <TestResult
        questions={questionsWithCorrect}
        result={result}
        answers={answers}
        changeTestRating={this.changeTestRating}
        testRating={testRating}
      />
    );
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

    return loading ? <Loading center /> : this.renderContent();
  }
}

const mapStateToProps = (state, ownProps) => {
  const testId = ownProps.match.params.testId;

  const testDescription = getTestDescription(state) || {};
  return {
    testId,
    testDescription,
    questionsIds: getQuestionsIds(state),
    questions: getQuestions(state),
    loading: getIsFetching(state) || !testDescription,
    answers: getTestAnswers(state),
    questionsRating: getQuestionRating(state),
    testRating: getTestRating(state)
  };
};

const mapDispatchToProps = {
  fetchTestToBeCompleted,
  saveTestAnswers,
  onChangeQuestionAnswer: setQuestionAnswer,
  onChangeQuestionRate,
  changeTestRating
};

MakeTest = connect(mapStateToProps, mapDispatchToProps)(injectIntl(MakeTest));

export default MainLayoutContextWrapper(MakeTest);
