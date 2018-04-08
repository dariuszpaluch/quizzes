import './test_summary.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import Card from 'libs/ui/Card/Card';
import { injectIntl } from 'react-intl';
import messages from 'modules/MakeTest/utils/messages';
import List from 'libs/ui/List/List';

import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import globalMessages from 'utils/globalMessages';
import Button from 'libs/ui/Button/Button';
import Icon from 'libs/ui/Icon/Icon';
import icons from 'consts/icons';

class TestSummary extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderSelectedAnswers(questionAnswers, selectedAnswersIds) {
    const answersRows = {};
    forEach(filter(questionAnswers, answer => selectedAnswersIds.indexOf(answer.id) > -1), answer => {
      answersRows[answer.id] = {
        label: answer.label,
      };
    });

    return (
      <List
        rowsIds={selectedAnswersIds}
        rows={answersRows}
      />
    )
  }

  renderActions() {
    const { intl, onBackToTest, onSave } = this.props;
    {/*<Button*/}
      {/*key="return-to-test"*/}
      {/*onClick={onBackToTest}*/}
    {/*>*/}
      {/*{intl.formatMessage(messages.RETURN_TO_TEST)}*/}
    {/*</Button>,*/}
    return [

      <Button
        key="save"
        color="primary"
        onClick={onSave}
        icon={icons.SAVE}
      >
        {intl.formatMessage(globalMessages.SAVE)}
      </Button>,
    ]
  }

  render() {
    const { className, intl, questionsIds, questions, userAnswers } = this.props;

    const classes = classnames('test-summary', className);

    const answersRows = {};

    questionsIds.forEach(questionId => {
      const question = questions[questionId];
      const selectedAnswersIds = userAnswers[questionId];

      answersRows[questionId] = {
        label: question.question,
        children: this.renderSelectedAnswers(question.answers, selectedAnswersIds),
      };
    });


    return(
      <Card
        className={classes}
        title={intl.formatMessage(messages.TEST_SUMMARY)}
        centerHeader
        actions={this.renderActions()}
        contentClass="test-summary-content"
        actionsClass="test-summary-actions"
      >

        <List className="questions-list"
          rowsIds={questionsIds}
          rows={answersRows}
        />


      </Card>
    );
  }
}

export default injectIntl(TestSummary);