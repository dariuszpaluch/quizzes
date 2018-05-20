import './logo.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

export default class Logo extends Component {
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
    const { className } = this.props;

    const classes = classnames('logo', className);

    return(
      <div className={classes}>
        <h1>Rocket quizz</h1>
      </div>
    );
  }
}
