import './list.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import icons from 'consts/icons';

import Collapse from 'material-ui/transitions/Collapse';
import MaterialList, {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import Checkbox from 'libs/ui/Checkbox';
import IconButton from 'libs/ui/IconButton/IconButton';
import filter from 'lodash/filter';
import noop from 'lodash/noop';
import size from 'lodash/size';

export default class List extends Component {
  static propTypes = {
    className: PropTypes.string,
    rowsIds: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    rows: PropTypes.objectOf(
      PropTypes.shape({
        label: PropTypes.string,
        children: PropTypes.any
      })
    ),
    selectedRowsIds: PropTypes.arrayOf(PropTypes.string),
    onChangeSelect: PropTypes.func,
    selectOnClick: PropTypes.bool,
    selectedClass: PropTypes.string
  };

  static defaultProps = {
    selectedRowsIds: [],
    onChangeSelect: null,
    rowsIds: {},
    rows: [],
    selectOnClick: false,
    selectedClass: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      openItems: {}
    };
  }

  onToggleItemCollapse = itemId => {
    this.setState({
      openItems: {
        ...this.state.openItems,
        [itemId]: !this.state.openItems[itemId]
      }
    });
  };

  onChangeSelect = (rowId, checked, event) => {
    const newValue = checked
      ? [...this.props.selectedRowsIds, rowId]
      : filter(this.props.selectedRowsIds, _rowId => _rowId !== rowId);

    this.props.onChangeSelect(newValue);
  };

  render() {
    const {
      selectedRowsIds,
      rowsIds,
      rows,
      selectOnClick,
      selectedClass,
      className
    } = this.props;

    const classes = classnames('list', className);

    if (!size(rows)) return null;

    return (
      <MaterialList className={classes}>
        {rowsIds.map(rowId => {
          const row = rows[rowId];
          const open = this.state.openItems[rowId];
          const selected = selectedRowsIds.indexOf(rowId) > -1;

          const onClick = selectOnClick
            ? this.onChangeSelect.bind(null, rowId, !selected)
            : row.children
              ? this.onToggleItemCollapse.bind(null, rowId)
              : null;

          return [
            <ListItem
              className={classnames('list-item', {
                [selectedClass]: selected,
                'have-children': !!row.children,
                clickable: !!onClick && !this.props.onChangeSelect
              })}
              key={`${rowId}-item`}
              button={!!onClick && !this.props.onChangeSelect}
              onClick={!this.props.onChangeSelect ? onClick : undefined}
            >
              {this.props.onChangeSelect && (
                <Checkbox
                  checked={selected}
                  onChange={
                    !selectOnClick
                      ? this.onChangeSelect.bind(null, rowId)
                      : noop
                  }
                />
              )}
              <ListItemText inset primary={row.label} />
              {row.children ? (
                <IconButton
                  icon={open ? icons.ARROW_UP : icons.ARROW_DOWN}
                  onClick={this.onToggleItemCollapse.bind(null, rowId)}
                />
              ) : null}
            </ListItem>,

            row.children ? (
              <Collapse
                key={`${rowId}-item-children`}
                in={open}
                timeout="auto"
                unmountOnExit
              >
                {row.children}
              </Collapse>
            ) : null
          ];
        })}
      </MaterialList>
    );
  }
}
