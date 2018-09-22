import './icon-button.scss';

import React, { Component } from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import MaterialIconButton from '@material-ui/core/IconButton';
import Icon from '../Icon/Icon';
import Loading from '../Loading';

export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    iconSize: PropTypes.number,
    loading: PropTypes.bool
  };

  static defaultProps = {
    iconSize: 20,
    loading: false
  };

  render() {
    const { className, icon, onClick, iconSize, loading, ...props } = this.props;

    const classes = classnames('icon-button', className);

    if (loading) return <Loading size={iconSize || 24} />;

    return (
      <MaterialIconButton className={classes} onClick={onClick} {...props}>
        <Icon size={iconSize} icon={icon} />
      </MaterialIconButton>
    );
  }
}
