import './test_results_statistics.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { injectIntl } from 'react-intl';
import { size } from 'lodash';
import messages from 'modules/Tests/utils/messages';

import Table from 'libs/ui/Table/Table';
import Typography from 'libs/ui/Typography/Typography';
import { Link } from 'react-router-dom';
import Icon from 'libs/ui/Icon/Icon';
import icons from 'consts/icons';
import parsePath from 'utils/parsePath';
import paths from 'consts/paths';
import IconButton from 'libs/ui/IconButton/IconButton';
import PercentageCircle from 'components/PerentageCircle/PercentageCircle';
import PieChart from 'libs/ui/charts/PieChart';

import { forEach, find, filter, every, range, map } from 'lodash';

import colors from 'styles/colors.scss';

import chartMessages from './chartMessages';
import BarChart from 'libs/ui/charts/BarChart';
import Card from 'libs/ui/Card/Card';
import Divider from '@material-ui/core/Divider/Divider';

class TestResultsStatistics extends Component {
  static propTypes = {
    userAnswers: PropTypes.array
  };

  static defaultProps = {
    userAnswers: []
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  renderContent() {
    const { test, intl } = this.props;

    console.log('darek', test);

    let numberOfCorrectQuestions = 0;
    let numberOfFailureQuestions = 0;

    const userResultSchedule = {};

    range(0, 101, 1).forEach(valueType => {
      userResultSchedule[valueType] = 0;
    });

    const questionsDetails = {};

    forEach(test.questions, question => {
      const answers = {};

      question.answers.forEach(answer => {
        answers[answer._id] = 0;
      });

      questionsDetails[question.id] = {
        correct: 0,
        failure: 0,
        answers
      };
    });

    forEach(test.userAnswers, userAnswer => {
      userResultSchedule[Math.floor(userAnswer.result * 100)] += 1;

      forEach(userAnswer.answers, userQuestionAnswer => {
        const allCorrectAnswers = filter(
          find(test.questions, { _id: userQuestionAnswer.questionId }).answers,
          { correct: true }
        );

        userQuestionAnswer.selectedAnswers.forEach(answerId => {
          questionsDetails[userQuestionAnswer.questionId].answers[answerId] += 1;
        });

        const userCorrect =
          every(
            allCorrectAnswers,
            correctAnswer => userQuestionAnswer.selectedAnswers.indexOf(correctAnswer._id) >= 0
          ) &&
          every(
            userQuestionAnswer.selectedAnswers,
            selectedAnswer => !!find(allCorrectAnswers, { _id: selectedAnswer })
          );

        if (userCorrect) {
          numberOfCorrectQuestions += 1;
          questionsDetails[userQuestionAnswer.questionId].correct += 1;
        } else {
          numberOfFailureQuestions += 1;
          questionsDetails[userQuestionAnswer.questionId].failure += 1;
        }
      });
    });

    const rozkladData = map(userResultSchedule, (value, valueType) => ({
      name: `${valueType}%`,
      value
    }));

    return (
      <div>
        <Typography variant="display2">
          {intl.formatMessage(chartMessages.GENERAL_STATISTICS_TITLE)}
        </Typography>
        <div className="statistics-content row no-space-xs">
          <div className="col-xs-12 col-sm-6">
            <PieChart
              width="100%"
              height={200}
              data={[
                {
                  name: intl.formatMessage(chartMessages.CORRECT_ANSWERS),
                  color: colors.successColor,
                  value: numberOfCorrectQuestions
                },
                {
                  name: intl.formatMessage(chartMessages.FAILURE_ANSWERS),
                  color: colors.errorColor,
                  value: numberOfFailureQuestions
                }
              ]}
            />
          </div>
          <div className="col-xs-12 col-sm-6">
            <Typography variant="title" center>
              {intl.formatMessage(chartMessages.SCHEDULE_OF_RESULTS)}
            </Typography>
            <BarChart
              width="100%"
              height={200}
              dataKey="name"
              data={rozkladData}
              bars={[
                {
                  fill: colors.primaryMain,
                  dataKey: 'value',
                  name: intl.formatMessage(chartMessages.NUMBER_OF_USERS)
                }
              ]}
            />
          </div>
        </div>
        <Divider style={{ margin: '20px 0' }} />
        <Typography variant="display2">
          {intl.formatMessage(chartMessages.STATISTICS_PER_QUESTIONS_TITLE)}
        </Typography>
        {test.questions.map(question => {
          const details = questionsDetails[question.id];

          const barChartData = question.answers.map(answer => ({
            name: answer.label,
            value: details.answers[answer._id]
          }));

          return (
            <Card key={question.id} className="col-xs-12 question-statistics">
              <Typography variant="title">{question.question}</Typography>
              <div className="statistics-content row no-space-xs">
                <div className="col-xs-12 col-sm-6">
                  <PieChart
                    width="100%"
                    height={200}
                    data={[
                      {
                        name: intl.formatMessage(chartMessages.CORRECT_ANSWERS),
                        color: colors.successColor,
                        value: details.correct
                      },
                      {
                        name: intl.formatMessage(chartMessages.FAILURE_ANSWERS),
                        color: colors.errorColor,
                        value: details.failure
                      }
                    ]}
                  />
                </div>
                <div className="col-xs-12 col-sm-6">
                  <Typography variant="title" center>
                    {intl.formatMessage(chartMessages.SCHEDULE_OF_ANSWERS)}
                  </Typography>
                  <BarChart
                    width="100%"
                    height={200}
                    dataKey="name"
                    data={barChartData}
                    bars={[
                      {
                        fill: colors.primaryMain,
                        dataKey: 'value',
                        name: intl.formatMessage(chartMessages.NUMBER_OF_USERS)
                      }
                    ]}
                  />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    );
  }

  render() {
    const { className, test, intl } = this.props;

    const classes = classnames(className);

    const numberOfAnswers = test && size(test.userAnswers);

    return (
      <div className={classes}>
        <Typography variant="display1">
          {intl.formatMessage(messages.NUMBER_OF_USER_ANSWERS, {
            userAnswersNumber: size(test.userAnswers)
          })}
        </Typography>
        {numberOfAnswers ? this.renderContent() : null}
      </div>
    );
  }
}

export default injectIntl(TestResultsStatistics);
