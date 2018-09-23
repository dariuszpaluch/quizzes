import './user_results_table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { injectIntl } from 'react-intl';
import { size } from 'lodash';

import Table from 'libs/ui/Table/Table';
import messages from 'modules/Tests/utils/messages';
import Typography from 'libs/ui/Typography/Typography';
import { Link } from 'react-router-dom';
import Icon from 'libs/ui/Icon/Icon';
import icons from 'consts/icons';
import parsePath from 'utils/parsePath';
import paths from 'consts/paths';
import IconButton from 'libs/ui/IconButton/IconButton';
import PercentageCircle from 'components/PerentageCircle/PercentageCircle';

class UserResultsTable extends Component {
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

  render() {
    const { className, userAnswers, intl } = this.props;

    console.log('darek', userAnswers);

    const classes = classnames('user-results-table', className);

    const numberOfAnswers = size(userAnswers);
    const _userAnwers = userAnswers.map((userAnswer, index) => ({
      ...userAnswer,
      index: index + 1,
      className: classnames('user-answer-row', {
        new: userAnswer && userAnswer.new
      })
    }));

    return (
      <div className={classes}>
        <Typography variant="display1">
          {intl.formatMessage(messages.NUMBER_OF_USER_ANSWERS, {
            userAnswersNumber: size(userAnswers)
          })}
        </Typography>
        {numberOfAnswers && userAnswers[0].id ? (
          <Table
            columns={[
              {
                id: 'index',
                content: '',
                style: {
                  width: '10px'
                },
                padding: 'none',
                numeric: true
              },
              {
                id: 'updatedAt',
                content: intl.formatMessage(messages.TABLE_HEADER_DATA),
                render: (date, row) => {
                  switch (row.status) {
                    case 'in-progress': {
                      return (
                        <span className="in-progress">
                          {intl.formatMessage(messages.USER_ANSWER_IN_PROGRESS_STATUS)}
                        </span>
                      );
                    }
                    case 'not-finished': {
                      return (
                        <span className="not-finished">
                          {intl.formatMessage(messages.USER_ANSWER_NOT_FINISHED_STATUS)}
                        </span>
                      );
                    }
                    default: {
                      return `${intl.formatTime(new Date(date))} ${intl.formatDate(
                        new Date(date)
                      )}`;
                    }
                  }
                }
              },
              {
                id: 'author.firstName',
                content: intl.formatMessage(messages.TABLE_HEADER_NAME),
                default: '-'
              },
              {
                id: 'author.lastName',
                content: intl.formatMessage(messages.TABLE_HEADER_SURNAME),
                default: '-'
              },
              {
                id: 'author.email',
                content: intl.formatMessage(messages.TABLE_HEADER_EMAIL),
                default: '-',
                render: email => (
                  <a className="email-address" href={`mailto:${email}`} target="_top">
                    {email}
                  </a>
                )
              },
              {
                id: 'result',
                content: intl.formatMessage(messages.TABLE_HEADER_RESULT),
                render: result => (
                  <div className="test-result-percentage">
                    <PercentageCircle
                      className="test-percentage-result"
                      percentage={Math.floor(result * 100)}
                      valueSize={10}
                      size={35}
                    />
                  </div>
                ),
                headCenter: true
              },
              {
                id: 'id',
                content: intl.formatMessage(messages.TABLE_HEADER_EDIT),
                render: testResultId => (
                  <Link
                    to={parsePath(paths.TESTS_RESULT, {
                      testResultId
                    })}
                  >
                    <IconButton icon={icons.tests} onClick={() => {}} />
                  </Link>
                )
              }
            ]}
            rows={_userAnwers}
          />
        ) : null}
      </div>
    );
  }
}

export default injectIntl(UserResultsTable);
