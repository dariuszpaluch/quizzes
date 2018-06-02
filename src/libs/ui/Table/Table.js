import './table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import RowActions from 'libs/ui/Table/RowActions';

class Table extends Component {
  static propTypes = {
    onClickEditRow: PropTypes.func,
    onClickDeleteRow: PropTypes.func
  };

  static defaultProps = {
    onClickEditRow: null,
    onClickDeleteRow: null
  };

  render() {
    const { columns, rows, onClickEditRow, onClickDeleteRow } = this.props;

    return (
      <MaterialTable className="table">
        <TableHead>
          <TableRow>
            {columns.map(column => {
              return <TableCell key={column.id}>{column.content}</TableCell>;
            })}
            <RowActions onDelete={onClickDeleteRow} onEdit={onClickEditRow} header />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id}>
                {columns.map(column => {
                  return <TableCell key={column.id}>{row[column.id]}</TableCell>;
                })}
                <RowActions
                  row={row}
                  onDelete={onClickDeleteRow}
                  onEdit={onClickEditRow}
                  isDeleting={row.isDeleting}
                />
              </TableRow>
            );
          })}
        </TableBody>
      </MaterialTable>
    );
  }
}

export default Table;
