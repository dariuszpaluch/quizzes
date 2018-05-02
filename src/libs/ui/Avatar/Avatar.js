import './avatar.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { Avatar as MaterialAvatar } from 'material-ui';

export default class Avatar extends Component {
  static propTypes = {
    alt: PropTypes.string,
    src: PropTypes.string.isRequired,
    size: PropTypes.number
  };

  static defaultProps = {
    alt: '',
    size: 40
  };

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { src, alt, size, className } = this.props;

    const classes = classnames('material-avatar', className);

    return (
      <MaterialAvatar
        className={classes}
        alt={alt}
        src={src}
        style={{
          width: size,
          height: size
        }}
      />
    );
  }
}
