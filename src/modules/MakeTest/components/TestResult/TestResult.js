import './test_result.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Card from 'libs/ui/Card/Card';
import messages from 'modules/MakeTest/utils/messages';
import StarRating from 'libs/ui/StarRating/StarRating';
import List from 'libs/ui/List/List';

import forEach from 'lodash/forEach';
import filter from 'lodash/filter';
import isEqual from 'lodash/isEqual';
import map from 'lodash/map';
import PercentageCircle from 'components/PerentageCircle/PercentageCircle';

class TestResult extends Component {
  static propTypes = {};

  static defaultProps = {
    questions: []
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  prepareQuestionsRows(questions, answers) {
    const rows = {};
    forEach(questions, question => {
      const userQuestionAnswers = answers && answers[question.id];
      const correctAnswers = map(filter(question.answers, { correct: true }), answer => answer.id);

      const correct = isEqual(correctAnswers, userQuestionAnswers);
      rows[question.id] = {
        ...question,
        label: question.question,
        children: '',
        className: classnames('question-item', {
          correct,
          incorrect: !correct
        })
      };
    });

    return rows;
  }

  render() {
    const {
      className,
      intl,
      result,
      changeTestRating,
      testRating,
      questions,
      answers
    } = this.props;

    const classes = classnames('test-result', className);

    const questionsIds = questions.map(question => question.id);
    return (
      <Card className={classes} title={intl.formatMessage(messages.TEST_SUMMARY_HEADER)}>
        Oceń test:
        <StarRating rating={testRating} onChange={changeTestRating} />
        WYNIK : {result}% poprawnych odpowiedzi
        <PercentageCircle
          percentage={Math.floor(result * 100)}
          label="Poprawnych odpowiedzi"
          labelSize={14}
        />
        <List
          className="question-result-list"
          rowsIds={questionsIds}
          rows={this.prepareQuestionsRows(questions, answers)}
        />
      </Card>
    );
  }
}

export default injectIntl(TestResult);
