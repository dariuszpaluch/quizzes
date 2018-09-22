import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import Input, { InputLabel } from '@material-ui/core/Input';
import { MenuItem } from '@material-ui/core/Menu';
import { FormControl, FormHelperText } from '@material-ui/core/Form';
import MaterialSelect from '@material-ui/core/Select';

export default class Select extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string,
    label: PropTypes.string,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
      })
    ).isRequired
  };

  static defaultProps = {
    name: '',
    label: null
  };

  renderOptions() {
    const { options } = this.props;

    return options.map(option => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  }

  _onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { value, name, label } = this.props;

    return (
      <FormControl>
        {!!label ? <InputLabel htmlFor={name}>{label}</InputLabel> : null}
        <MaterialSelect
          value={value}
          onChange={this._onChange}
          input={<Input name={name} id={name} />}
        >
          {this.renderOptions()}
        </MaterialSelect>
      </FormControl>
    );
  }
}
