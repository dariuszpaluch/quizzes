import './list.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import icons from 'consts/icons';

import Collapse from 'material-ui/transitions/Collapse';
import MaterialList, { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'libs/ui/Checkbox';
import IconButton from 'libs/ui/IconButton/IconButton';
import filter from 'lodash/filter';

export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    rowsIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])),
    rows: PropTypes.objectOf(PropTypes.shape({
      label: PropTypes.string,
      children: PropTypes.any,
    })),
    selectedRowsIds: PropTypes.arrayOf(PropTypes.string),
    onChangeSelect: PropTypes.func,
  };

  static defaultProps = {
    selectedRowsIds: [],
    onChangeSelect: null,
    rowsIds: {},
    rows: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      openItems: {}
    }
  }

  onToggleItemCollapse = (itemId) => {
    this.setState({
      openItems: {
        ...this.state.openItems,
        [itemId]: !this.state.openItems[itemId]
      }
    })
  };

  onChangeSelect = (rowId, checked) => {
    console.log(rowId, checked);

    const newValue = checked ?
      [...this.props.selectedRowsIds, rowId]
      : filter(this.props.selectedRowsIds, _rowId => _rowId !== rowId);

    this.props.onChangeSelect(newValue);
  };

  render() {
    const {
      selectedRowsIds,
      rowsIds,
      rows,
    } = this.props;

    const classes = classnames('list');

    return (
      <MaterialList className={classes}>
        {rowsIds.map(rowId => {
          const row = rows[rowId];
          const open = this.state.openItems[row.id];
          const selected = selectedRowsIds.indexOf(row.id) > -1;

          return [
            <ListItem
              key={`${row.id}-item`}
            >
              {this.props.onChangeSelect && (
                <Checkbox
                  checked={selected}
                  onChange={this.onChangeSelect.bind(null, row.id)}
                />
              )}
              <ListItemText inset primary={row.label}/>
              {
                row.children ?
                  <IconButton
                    icon={open ? icons.ARROW_UP : icons.ARROW_DOWN}
                    onClick={this.onToggleItemCollapse.bind(null, row.id)}
                  />
                  : null
              }
            </ListItem>,

            row.children ?
              <Collapse
                key={`${row.id}-item-children`}
                in={open}
                timeout="auto"
                unmountOnExit
              >
                {row.children}
              </Collapse> : null
          ]
        })}
      </MaterialList>
    );
  }
}