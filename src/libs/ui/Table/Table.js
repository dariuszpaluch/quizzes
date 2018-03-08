import React, {Component} from 'react';
import MaterialTable, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';

class Table extends Component {
  render() {
    const {
      columns,
      rows,
    } = this.props;

    return (
      <MaterialTable>
        <TableHead>
          <TableRow>
            {
              columns.map(column => {
                return (
                  <TableCell
                    key={column.id}
                  >{column.content}</TableCell>
                );
              })
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rows.map(row => {
              return (
                <TableRow key={row.id}>
                  {
                    columns.map((column, index) => {
                      return (
                        <TableCell
                          key={column.id}
                        >{row[column.id]}</TableCell>
                      )
                    })
                  }
                </TableRow>
              )
            })
          }
        </TableBody>
      </MaterialTable>
    );
  }
}

export default Table;