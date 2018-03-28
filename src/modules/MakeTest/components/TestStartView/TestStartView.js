import './test_start_view.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import Button from 'libs/ui/Button/Button';
import messages from 'modules/MakeTest/utils/messages';
import { injectIntl } from 'react-intl';
import Card from 'libs/ui/Card/Card';

class TestStartView extends Component {
  static propTypes = {
    testDescription: PropTypes.shape({
      created: PropTypes.instanceOf(Date),
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    numberOfQuestions: PropTypes.number.isRequired,
    onClickStart: PropTypes.func.isRequired,
  };

  static defaultProps = {
    testDescription: {
      name: '',
      description: '',
      created: null,
    }
  };

  render() {
    const { className, onClickStart, testDescription, numberOfQuestions, intl } = this.props;

    const classes = classnames('test-start-view', className);

    console.log(testDescription);

    const { description, name, created } = testDescription;


    const _descriptionItems = [
      {
        intlMessage: messages.DESCRIPTION_TEST,
        value: description
      },
      {
        intlMessage: messages.NUMBER_OF_QUESTIONS,
        value: numberOfQuestions,
      },
      {
        intlMessage: messages.CREATED_TEST_DATE,
        value: intl.formatDate(created),
      }
    ];

    return (
      <Card
        className={classes}
        title={name}
        centerHeader
      >
        <div className="test-description">
          {_descriptionItems.map(({intlMessage, value}, index) => {
            return (
              <p key={index}>
                <label>{intl.formatMessage(intlMessage)}</label>
                <span>{value}</span>
              </p>
            );
          })}
        </div>
        <Button
          className="start-test-button"
          onClick={onClickStart}
        >{intl.formatMessage(messages.START_TEST_BUTTON)}</Button>
      </Card>
    );
  }
}

export default injectIntl(TestStartView);