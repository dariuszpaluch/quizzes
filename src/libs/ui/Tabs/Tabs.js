import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Tabs as MaterialTabs, Tab } from '@material-ui/core';

import findIndex from 'lodash/findIndex';
import isArray from 'lodash/isArray';
import * as classnames from 'classnames';

import './tabs.scss';

export default class Tabs extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.array])
      })
    ),
    children: PropTypes.any
  };

  static defaultProps = {
    value: null,
    tabs: [],
    children: null
  };

  constructor(props) {
    super(props);

    this.getSelectedIndex = ::this.getSelectedIndex;
  }

  onChange = (event, value) => {
    const { tabs } = this.props;

    this.props.onChange(tabs[value]);
  };

  getSelectedIndex() {
    const { tabs, value } = this.props;

    return findIndex(tabs, ({ value: tabValue }) => {
      if (isArray(tabValue)) {
        return tabValue.indexOf(value) > -1;
      }

      return tabValue === value;
    });
  }

  renderTabs() {
    const { tabs } = this.props;

    return tabs.map(tab => <Tab label={tab.label} key={tab.value} />);
  }

  render() {
    const { fullWidth } = this.props;

    return (
      <div className={classnames('tabs', {
        'full-width': fullWidth,
      })}>
        <MaterialTabs
          value={this.getSelectedIndex() || 0}
          onChange={this.onChange}
          indicatorColor="primary"
          textColor="primary"
        >
          {this.renderTabs()}
        </MaterialTabs>
      </div>
    );
  }
}
