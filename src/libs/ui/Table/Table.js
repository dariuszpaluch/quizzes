import './table.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import RowActions from 'libs/ui/Table/RowActions';
import { get, pick } from 'lodash';
import * as classnames from 'classnames';

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

    return column.render ? column.render(value, row) : value;
  };

  static getColumnProps(column) {
    return pick(column, ['component', 'numeric', 'padding', 'scrope', 'sortDirection']);
  }

  render() {
    const { columns, rows, onClickEditRow, onClickDeleteRow } = this.props;

    return (
      <MaterialTable className="table">
        <TableHead>
          <TableRow>
            {columns.map(column => {
              return (
                <TableCell {...Table.getColumnProps(column)} key={column.id} variant="head" className={classnames({
                  'center': column.headCenter,
                })}>
                  {column.content}
                </TableCell>
              );
            })}
            <RowActions onDelete={onClickDeleteRow} onEdit={onClickEditRow} header />
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow key={row.id} className={row.className}>
                {columns.map(column => {
                  return (
                    <TableCell
                      {...Table.getColumnProps(column)}
                      key={column.id}
                      padding={column.padding}
                    >
                      {this.renderCellValue(row, column)}
                    </TableCell>
                  );
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
