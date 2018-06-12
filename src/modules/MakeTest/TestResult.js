import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { connect } from 'react-redux';

import List from 'libs/ui/List/List';

import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import map from 'lodash/map';
import size from 'lodash/size';
import PercentageCircle from 'components/PerentageCircle/PercentageCircle.js';
import Card from 'libs/ui/Card/Card';
import every from 'lodash/every';
import Typography from 'libs/ui/Typography/Typography';

import { getTestResult } from './utils/actions';

import './test_result.scss';

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

  questionIsCorrect(allCorrectAnswers, userAnswers) {
    return (
      every(allCorrectAnswers, answer => userAnswers.indexOf(answer) >= 0) &&
      size(allCorrectAnswers) === size(userAnswers)
    );
  }

  renderAnswers(answers, userAnswers) {
    return (
      <div>
        {answers.map(answer => {
          const correct = userAnswers.indexOf(answer.id) >= 0;
          return (
            <p
              key={answer.id}
              className={classnames('answer', {
                correct
              })}
            >
              {answer.label}
            </p>
          );
        })}
      </div>
    );
  }

  renderQuestions() {
    const { questions, answers } = this.props;

    const questionsRendered = {};
    let corrects = 0;

    forEach(questions.byId, question => {
      const allCorrectAnswers = map(
        filter(question.answers, { correct: true }),
        answer => answer.id
      );
      const correct = this.questionIsCorrect(allCorrectAnswers, answers[question.id]);

      if (correct) corrects += 1;
      questionsRendered[question.id] = {
        label: question.question,
        className: classnames('question-item', {
          correct,
          wrong: !correct
        }),
        children: this.renderAnswers(question.answers, answers[question.id])
      };
    });

    return {
      questionsRendered,
      corrects
    };
  }

  render() {
    const { questions, test, answers, loading } = this.props;

    if (loading) return null;

    const { questionsRendered, corrects } = this.renderQuestions();

    return (
      <Card className="test-result" noSpace title="Wynik testu">
        <div className="test-result-stats">
          <PercentageCircle
            className="test-percentage-result"
            percentage={Math.floor(corrects / size(questions.allIds) * 100)}
            valueSize={15}
            size={50}
          />
          <Typography variant="subheading">
            Poprawnych odpowiedzi {corrects} z {size(questions.allIds)}
          </Typography>
        </div>
        <List rowsIds={questions.allIds} rows={questionsRendered} />
      </Card>
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
