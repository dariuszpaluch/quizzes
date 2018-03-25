import './chip_list.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'

import classnames from 'classnames';

import filter from 'lodash/filter';
import Chip from 'libs/ui/Chip';

export default class ChipList extends Component {
  static propTypes = {
    className: PropTypes.string,
    chips: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      label: PropTypes.string,
    })),
    onDeleteChip: PropTypes.func.isRequired,
  };

  static defaultProps = {
    chips: [],
    className: '',
  };

  render() {
    const {
      className,
      chips,
    } = this.props;

    const classes = classnames(className, 'chip-list');

    return (
      <div className={classes}>
        { chips.map(chip => (
          <Chip
            key={chip.id}
            label={chip.label}
            onDelete={this.props.onDeleteChip.bind(null, chip.id)}
          />
        ))}
      </div>
    );
  }
}