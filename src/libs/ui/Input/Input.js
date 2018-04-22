import './input.scss';

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

  onChange = (event) => {
    this.props.onChange(event.target.value);
  };

  focus = () => {
    console.log('focus');
    this.ref && this.ref.focus();
  };

  render() {
    const {
      children,
      className,
      error,
      warning,
      helperText,
      ...props,
    } = this.props;

    const classes = classnames('material-ui-input', className, {
      'have-error': !!error,
    });

    return (
      <MaterialTextField
        {...props}
        ref={(ref) => this.ref = ref}
        className={classes}
        error={!!error}
        helperText={helperText || error || undefined}
        onChange={this.onChange}
      >{children}</MaterialTextField>
    );
  }
}