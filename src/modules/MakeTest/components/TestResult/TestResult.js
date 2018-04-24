import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { injectIntl } from 'react-intl';
import Card from 'libs/ui/Card/Card';
import messages from 'modules/MakeTest/utils/messages';

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
    const { className, intl, result } = this.props;

    const classes = classnames(className);

    return(
      <Card
        className={classes}
        title={intl.formatMessage(messages.TEST_SUMMARY_HEADER)}
      >

        WYNIK : {result}
      </Card>
    );
  }
}

export default injectIntl(TestResult);