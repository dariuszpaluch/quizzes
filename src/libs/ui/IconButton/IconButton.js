import './icon-button.scss';

import React, {Component} from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import MaterialTextField from 'material-ui/TextField';
import MaterialIconButton from 'material-ui/IconButton';
import Icon from '../Icon/Icon';
export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    iconSize: PropTypes.number,
  };

  static defaultProps = {
    iconSize: 20,
  };

  render() {
    const {
      className,
      icon,
      onClick,
      iconSize,
      ...props,
    } = this.props;

    const classes = classnames('icon-button', className);
    return (
      <MaterialIconButton
        className={classes}
        onClick={onClick}
        {...props}
      ><Icon size={iconSize} icon={icon}/></MaterialIconButton>
    );
  }
}