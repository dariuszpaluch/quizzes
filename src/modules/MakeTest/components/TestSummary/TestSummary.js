import './test_summary.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Card from 'libs/ui/Card/Card';
import { injectIntl } from 'react-intl';
import messages from 'modules/MakeTest/utils/messages';

import globalMessages from 'utils/globalMessages';
import Button from 'libs/ui/Button/Button';
import icons from 'consts/icons';
import PercentageCircle from 'components/PerentageCircle/PercentageCircle';
import Typography from 'libs/ui/Typography/Typography';
import { Link } from 'react-router-dom';
import paths, { testsPaths } from 'consts/paths';
import parsePath from 'utils/parsePath';

class TestSummary extends Component {
  renderActions() {
    const { intl, testResultId } = this.props;
    return [
      <Link key="return" to={`${paths.TESTS}${testsPaths.SEARCH_TESTS}`}>
        <Button onClick={() => {}} icon={icons.ARROW_BACK}>
          {intl.formatMessage(globalMessages.BACK)}
        </Button>
      </Link>,
      <Link
        key="test-result"
        to={parsePath(paths.TESTS_RESULTS, {
          testResultId
        })}
        disabled
      >
        <Button disabled color="primary" onClick={() => {}} icon={icons.tests}>
          {intl.formatMessage(messages.TEST_SUMMARY_GO_TO_TEST_RESULT)}
        </Button>
      </Link>
    ];
  }

  render() {
    const { className, intl, result, numberOfQuestions } = this.props;

    const classes = classnames('test-summary', className);

    return (
      <Card
        className={classes}
        title={intl.formatMessage(messages.TEST_SUMMARY)}
        centerHeader
        actions={this.renderActions()}
        contentClass="test-summary-content"
        actionsClass="test-summary-actions"
      >
        <PercentageCircle
          className="test-percentage-result"
          percentage={Math.floor(result * 100)}
          label="Wynik testu"
          labelSize={20}
          valueSize={60}
          size={250}
        />
        <Typography
          center
          variant="headline"
        >{`${Math.floor(result * 100)}% poprawnych odpowiedzi`}</Typography>
      </Card>
    );
  }
}

export default injectIntl(TestSummary);
