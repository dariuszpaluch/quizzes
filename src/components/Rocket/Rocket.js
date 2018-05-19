import './rocket.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import rocketSVG from 'assets/rocket-ship.svg';
import SVGInline from 'react-svg-inline';

export default class Rocket extends Component {
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
    const { className} = this.props;

    const classes = classnames('rocket', className);

    return(
      <div className={classes}>
        <div className='smoke'>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <SVGInline className="rocket-background" width={100} svg={rocketSVG} />
      </div>
    );
  }
}
