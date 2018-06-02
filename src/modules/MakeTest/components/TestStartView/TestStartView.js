import './test_start_view.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Button from 'libs/ui/Button/Button';
import messages from 'modules/MakeTest/utils/messages';
import { injectIntl } from 'react-intl';
import Card from 'libs/ui/Card/Card';
import StarRating from 'libs/ui/StarRating/StarRating';

class TestStartView extends Component {
  static propTypes = {
    testDescription: PropTypes.shape({
      created: PropTypes.instanceOf(Date),
      name: PropTypes.string,
      description: PropTypes.string
    }),
    numberOfQuestions: PropTypes.number.isRequired,
    onClickStart: PropTypes.func.isRequired
  };

  static defaultProps = {
    testDescription: {
      name: '',
      description: '',
      created: null
    }
  };

  render() {
    const { className, onClickStart, testDescription, numberOfQuestions, intl } = this.props;

    const classes = classnames('test-start-view', className);

    const { description, name, created, meta } = testDescription;

    const _descriptionItems = [
      {
        intlMessage: messages.DESCRIPTION_TEST,
        value: description
      },
      {
        intlMessage: messages.NUMBER_OF_QUESTIONS,
        value: numberOfQuestions
      },
      {
        intlMessage: messages.CREATED_TEST_DATE,
        value: intl.formatDate(created)
      },
      {
        intlMessage: messages.TEST_RATING,
        // value: meta && meta.rating,
        value: meta && meta.rating && <StarRating rating={meta.rating} disabled />
      }
    ];

    return (
      <Card className={classes} title={name} centerHeader>
        <div className="test-description">
          {_descriptionItems.map(({ intlMessage, value }, index) => {
            return (
              <div key={index}>
                <label>{intl.formatMessage(intlMessage)}</label>
                <div>{value}</div>
              </div>
            );
          })}
        </div>
        <Button className="start-test-button" onClick={onClickStart}>
          {intl.formatMessage(messages.START_TEST_BUTTON)}
        </Button>
      </Card>
    );
  }
}

export default injectIntl(TestStartView);
