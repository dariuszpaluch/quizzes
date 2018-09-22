import React from 'react';
import PropTypes from 'prop-types';
import filter from 'lodash/filter';

import TableCell from '@material-ui/core/TableCell';
import IconButton from 'libs/ui/IconButton/IconButton';

const propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

const defaultProps = {
  onEdit: null,
  onDelete: null
};

const RowActions = props => {
  const onDelete = () => {
    props.onDelete(props.row.id);
  };

  const onEdit = () => {
    props.onEdit(props.row);
  };

  const renderTableCell = (key, content) => (
    <TableCell className="action-cell" key={key}>
      {content}
    </TableCell>
  );

  const actions = filter(
    [
      {
        icon: 'edit',
        onClick: onEdit,
        visible: !!props.onEdit,
        disabled: props.isDeleting
      },
      {
        icon: 'delete',
        onClick: onDelete,
        visible: !!props.onDelete,
        loading: props.isDeleting
      }
    ],
    { visible: true }
  );

  if (props.header) {
    return actions.map((action, index) => renderTableCell(index));
  }

  return actions.map((action, index) =>
    renderTableCell(index, <IconButton icon={action.icon} onClick={action.onClick} />)
  );
};

RowActions.propTypes = propTypes;
RowActions.defaultProps = defaultProps;

export default RowActions;
