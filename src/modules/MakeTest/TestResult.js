import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { getTestResult } from './utils/actions';

import MakeTestForm from 'modules/MakeTest/components/MakeTestForm/MakeTestForm';

class TestResult extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.getTestResult(this.props.testResultId);
  }

  render() {
    const { questions, test, answers, loading } = this.props;

    if (loading) return null;

    return (
      <MakeTestForm
        questionsIds={questions.byId}
        questions={questions.allIds}
        testName={test.name}
        values={answers}
        disabled
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  testResultId: ownProps.match.params.testResultId,
  test: state.makeTest.testData,
  questions: state.makeTest.questions,
  answers: state.makeTest.answers,
  loading: !state.makeTest.questions || !state.makeTest.testData
});

const mapDispatchToProps = {
  getTestResult
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResult);
