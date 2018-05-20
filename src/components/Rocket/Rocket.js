import './rocket.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import rocketSVG from 'assets/rocket-ship.svg';
import SVGInline from 'react-svg-inline';

export default class  Rocket extends Component {
  static propTypes = {
    withoutAnimation: PropTypes.bool,
  };

  static defaultProps = {
    withoutAnimation: false,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, withoutAnimation } = this.props;

    const classes = classnames('rocket', {'without-animation': withoutAnimation},className);

    if (withoutAnimation)
      return (
        <div className={classes}>
          <SVGInline className="rocket-background" width="100" svg={rocketSVG} />
        </div>
      );

    return (
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
        <SVGInline className="rocket-background" width="100" svg={rocketSVG} />
      </div>
    );
  }
}
