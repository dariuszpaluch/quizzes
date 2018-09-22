import './logo.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Typography from 'libs/ui/Typography/Typography';

export default class Logo extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className } = this.props;

    const classes = classnames('logo', className);

    return (
      <div className={classes}>
        <Typography variant="display3">Rocket quizz</Typography>
      </div>
    );
  }
}
