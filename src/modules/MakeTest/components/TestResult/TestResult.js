import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Card from 'libs/ui/Card/Card';
import messages from 'modules/MakeTest/utils/messages';
import StarRating from 'libs/ui/StarRating/StarRating';

class TestResult extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { className, intl, result, changeTestRating, testRating } = this.props;

    const classes = classnames(className);

    return(
      <Card
        className={classes}
        title={intl.formatMessage(messages.TEST_SUMMARY_HEADER)}
      >
        Oceń test:
        <StarRating rating={testRating} onChange={changeTestRating}/>
        WYNIK : {result}
      </Card>
    );
  }
}

export default injectIntl(TestResult);