import React, {Component} from 'react';

import classnames from 'classnames';

import MaterialTextField from 'material-ui/TextField';

export default class Input extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      children,
      className,
      error,
      warning,
      helperText,
      ...props,
    } = this.props;

    const classes = classnames("input", className);
    return (
      <MaterialTextField
        className={classes}
        error={!!error}
        helperText={helperText || error || ''}
        {...props}
      >{children}</MaterialTextField>
    );
  }
}