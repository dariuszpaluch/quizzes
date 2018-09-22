import './user_results_table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import { injectIntl } from 'react-intl';
import { size } from 'lodash';

import Table from 'libs/ui/Table/Table';
import messages from 'modules/Tests/utils/messages';
import Typography from 'libs/ui/Typography/Typography';

class UserResultsTable extends Component {
  static propTypes = {
    userAnswers: PropTypes.array,
  };

  static defaultProps = {
    userAnswers: [],
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, userAnswers, intl } = this.props;

    const classes = classnames('user-results-table', className);

    const numberOfAnswers = size(userAnswers);
    const _userAnwers = userAnswers.map((userAnswer, index) => ({

      ...userAnswer,
      index: index + 1,
      className: classnames('user-answer-row', {
        new: userAnswer && userAnswer.new,
      })
    }));

    return (
      <div className={classes}>
        <Typography
          variant="display1">{intl.formatMessage(messages.NUMBER_OF_USER_ANSWERS, { userAnswersNumber: size(userAnswers) })}</Typography>
        {numberOfAnswers && userAnswers[0].id ? <Table columns={[
          {
            id: 'index',
            content: 'Lp.',
            style: {
              width: '10px',
            },
            padding: 'none',
            numeric: true,
          },
          {
            id: 'updatedAt',
            content: 'Data',
            render: (date, row) => {
              switch(row.status) {
                case 'in-progress': {
                  return <span className="in-progress">{intl.formatMessage(messages.USER_ANSWER_IN_PROGRESS_STATUS)}</span>
                }
                case 'not-finished': {
                  return <span className="not-finished">{intl.formatMessage(messages.USER_ANSWER_NOT_FINISHED_STATUS)}</span>
                }
                default: {
                  return `${intl.formatTime(new Date(date))} ${intl.formatDate(new Date(date))}`;
                }
              }
            }
          },
          {
            id: 'author.firstName',
            content: 'Imię',
            default: '-',
          },
          {
            id: 'author.lastName',
            content: 'Nazwisko',
            default: '-',
          },
          {
            id: 'author.email',
            content: 'Email',
            default: '-',
            render: (email) => <a href={`mailto:${ email}`} target="_top">{email}</a>
          },
          {
            id: 'result',
            content: 'Wynik',
            render: (result) => `${Math.floor(result * 100)}%`,
            numeric: true,
          }
        ]} rows={_userAnwers}>

        </Table> : null}
      </div>
    );
  }
}

export default injectIntl(UserResultsTable);
