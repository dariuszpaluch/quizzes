import './percentage_circle.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export default class PercentageCircle extends Component {
  static propTypes = {
    percentage: PropTypes.number,
    size: PropTypes.number,
    label: PropTypes.string,
    labelSize: PropTypes.number,
    valueSize: PropTypes.number,
  };

  static defaultProps = {
    percentage: 0,
    size: 150,
    label: '',
    labelSize: 10,
    valueSize: 35,
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { className, percentage, size, label, labelSize, valueSize } = this.props;

    const classes = classnames('percentage-progress', className);

    const progressBarLeftStyle = {
      borderTopRightRadius: `${size / 2}px`,
      borderBottomRightRadius: `${size / 2}px`
    };

    const progressBarRightStyle = {
      borderTopLeftRadius: `${size / 2}px`,
      borderBottomLeftRadius: `${size / 2}px`
    };

    return (
      <div
        className={classes}
        data-percentage={percentage}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          lineHeight: `${size}px`
        }}
      >
        <span className="progress-left">
          <span className="progress-bar" style={progressBarLeftStyle} />
        </span>
        <span className="progress-right">
          <span className="progress-bar" style={progressBarRightStyle} />
        </span>
        <div className="progress-value">
          <div>
            <div
              className="value"
              style={{
                fontSize: `${valueSize}px`,
                lineHeight: `${valueSize}px`
              }}
            >
              {percentage}%
            </div>
            {label ? <label style={{ fontSize: `${labelSize}px` }}>{label}</label> : null}
          </div>
        </div>
      </div>
    );
  }
}
