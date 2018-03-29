import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';

import { fetchTestToBeCompleted, saveTestAnswers, setQuestionAnswer } from 'modules/MakeTest/utils/actions';
import TestStartView from 'modules/MakeTest/components/TestStartView/TestStartView';
import {
  getIsFetching, getQuestions, getQuestionsIds, getTestAnswers,
  getTestDescription
} from 'modules/MakeTest/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import Loading from 'libs/ui/Loading/Loading';
import MakeTestForm from 'modules/MakeTest/components/MakeTestForm/MakeTestForm';

class MakeTest extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      started: false,
    };
  }

  componentWillReceiveProps() {
  }

  componentWillMount() {
    this.props.fetchTestToBeCompleted(this.props.testId);
  }

  startTest = () => {
    this.setState({
      started: true,
    })
  };

  onSave = () => {
    const { answers, testId } = this.props;

    this.props.saveTestAnswers(testId, answers);
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

  onChangeAnswer = (questionId, answers) => {
    this.props.onChangeQuestionAnswer(questionId, answers);
  };

  renderContent() {
    if (!this.state.started)
      return this.renderStartView();

    const { questionsIds, questions, testDescription, answers } = this.props;

    return (
      <MakeTestForm
        questionsIds={questionsIds}
        questions={questions}
        testName={testDescription.name}
        values={answers}
        onChangeQuestionAnswer={this.onChangeAnswer}
      />
    );
  }

  render() {
    const { loading } = this.props;

    return (
      <MainLayout>
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

export default connect(mapStateToProps, mapDispatchToProps)(MakeTest);