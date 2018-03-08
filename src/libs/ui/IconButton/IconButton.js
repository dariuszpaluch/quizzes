import React, {Component} from 'react';

import classnames from 'classnames';
import PropTypes from 'prop-types';

import MaterialTextField from 'material-ui/TextField';
import MaterialIconButton from 'material-ui/IconButton';
import Icon from "material-ui/es/Icon/Icon";
export default class IconButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
  };

  render() {
    const {
      className,
      icon,
      onClick,
      ...props,
    } = this.props;

    const classes = classnames("icon-button", className);
    return (
      <MaterialIconButton
        className={classes}
        onClick={onClick}
        {...props}
      ><Icon>{icon}</Icon></MaterialIconButton>
    );
  }
}