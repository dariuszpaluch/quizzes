import './test_description_card.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import Card from 'libs/ui/Card/Card';
import Icon from 'libs/ui/Icon/Icon';
import Typography from 'libs/ui/Typography/Typography';
import { FormattedDate } from 'react-intl';

class TestDescriptionCard extends Component {
  static propTypes = {
    test: PropTypes.object.isRequired,
    description: PropTypes.string,
  };

  static defaultProps = {
    description: '',
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { className, test: {name, description, created} } = this.props;

    const classes = classnames(className, 'test-description-card');

    return(
      <Card
        className={classes}
        title={name}
        subheader={created && <FormattedDate value={created} />}
      >

      </Card>
    );
  }
}

export default TestDescriptionCard;

