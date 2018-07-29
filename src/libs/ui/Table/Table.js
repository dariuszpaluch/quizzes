import './table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MaterialTable, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import RowActions from 'libs/ui/Table/RowActions';
import { get } from 'lodash';

class Table extends Component {
  static propTypes = {
    onClickEditRow: PropTypes.func,
    onClickDeleteRow: PropTypes.func
  };

  static defaultProps = {
    onClickEditRow: null,
    onClickDeleteRow: null
  };

  renderCellValue = (row, column) => {
    const value = get(row, column.id);

    return column.render ? column.render(value) : value;
  } ;

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
                  return <TableCell key={column.id}>{this.renderCellValue(row, column)}</TableCell>;
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
