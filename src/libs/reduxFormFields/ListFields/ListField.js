import React from 'react';
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

const ListField =  ({input,  meta: { touched, error, warning }, inputPlaceholder, className, index, onRemove,  ...restProps, }) => {

  const classes = classnames(className);

  const onChange = (label) => {
    input.onChange({
      ...input.value,
      label,
    })
  };

  const onSelect = () => {
    input.onChange({
      ...input.value,
      select: !input.value.select,
    })
  };

  const onBlur = () => {
    input.onBlur(input.value);
  };

  const _onRemove = () => {
    onRemove(index);
  };

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
        onChange={onSelect}
        color="default"
        disabled={!input.value.select && !size(input.value.label)}
      />
      <Input
        {...input}
        {...restProps}
        className="list-field-input"
        value={input.value.label}
        onChange={onChange}
        error={touched && error}
        warning={touched && warning}
        onBlur={onBlur}
      />
      <IconButton
        className="remove-item-button"
        icon="clear"
        onClick={_onRemove}
      />
    </ListItem>
  )
};

ListField.propTypes = propTypes;
ListField.defaultProps = defaultProps;

export default ListField;

