import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';
import { ListItem } from 'material-ui';
import Checkbox from 'libs/ui/Checkbox/Checkbox';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import IconButton from 'libs/ui/IconButton/IconButton';
import Input from 'libs/ui/Input/Input';
import size from 'lodash/size';

const propTypes = {
  className: PropTypes.string,
};

const defaultProps = {
  className: null,
};

class ListField extends Component {
  onChange = (label) => {
    const { input } = this.props;
    input.onChange({
      ...input.value,
      label,
    })
  };

  onSelect = () => {
    const { input } = this.props;

    input.onChange({
      ...input.value,
      select: !input.value.select,
    })
  };

  onBlur = () => {
    const { input } = this.props;

    input.onBlur(input.value);
  };

   onRemove = () => {
     const { onRemove, index} = this.props;

    onRemove(index);
  };

  render() {
    const {input,  meta: { touched, error, warning }, inputPlaceholder, className, index, onRemove, autoFocus,  ...restProps, } = this.props;
    const classes = classnames(className);

    return (
      <ListItem
        dense
        className={classnames('list-field', {
          'selected': input.value.select,
        })}
      >
        <Checkbox
          className="list-item-checkbox"
          checked={input.value.select}
          disableRipple
          onChange={this.onSelect}
          color="default"
          disabled={!input.value.select && !size(input.value.label)}
          onBlur={this.onBlur}
        />
        <Input
          {...input}
          {...restProps}
          className="list-field-input"
          value={input.value.label}
          onChange={this.onChange}
          error={touched && error}
          warning={touched && warning}
          onBlur={this.onBlur}
          autoFocus={autoFocus}
        />
        <IconButton
          className="remove-item-button"
          icon="clear"
          onClick={this.onRemove}
        />
      </ListItem>
    );
  }
}

ListField.propTypes = propTypes;
ListField.defaultProps = defaultProps;

export default ListField;

