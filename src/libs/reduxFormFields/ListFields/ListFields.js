import './list_fields.scss';

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import STRINGS from 'modules/Question/utils/strings';
import Button from 'libs/ui/Button/Button';
import MaterialList, { ListItem } from 'material-ui/List/index';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import IconButton from 'libs/ui/IconButton/IconButton';
import Typography from 'libs/ui/Typography/Typography';
import Checkbox from 'libs/ui/Checkbox/Checkbox';
import { Field, Fields } from 'redux-form';

import ListField from './ListField';
import Icon from 'libs/ui/Icon/Icon';
import icons from 'consts/icons';
import size from 'lodash/size';
import { FormLabel } from 'material-ui';

const propTypes = {
  className: PropTypes.string
};

const defaultProps = {
  className: null
};

const ListFields = ({
  fields,
  meta: { dirty, error, warning },
  className,
  inputPlaceholder,
  inputValid,
  addButtonLabel
}) => {
  const classes = classnames('list-fields', className);

  // const canAddRow = () => !size(fields) || size(fields.get(0).label);
  const addField = () => {
    // if (canAddRow()) {
    fields.insert(0, {
      label: '',
      id: '',
      correct: false
    });
    // }
  };

  const removeField = index => {
    fields.remove(index);
  };

  const selectField = index => {
    const item = fields.get(index);
    fields.remove(index);

    fields.insert(index, {
      ...item,
      selected: !item.selected
    });
  };

  const fieldsSize = size(fields);

  return (
    <MaterialList className={classes}>
      <Button className="add-list-field" onClick={addField}>
        <Icon icon={icons.ADD} />
        {addButtonLabel || 'Add'}
      </Button>
      {error && dirty ? <FormLabel error>{error}</FormLabel> : null}
      {fields.map((name, index) => {
        return (
          <Field
            key={fieldsSize - index}
            name={`${name}`}
            placeholder={inputPlaceholder}
            component={ListField}
            onRemove={removeField}
            index={index}
            autoFocus={index === 0}
          />
        );
      })}
    </MaterialList>
  );
};

ListFields.propTypes = propTypes;
ListFields.defaultProps = defaultProps;

export default ListFields;
