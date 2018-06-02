
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MaterialTabs, { Tab } from 'material-ui/Tabs';

import findIndex from 'lodash/findIndex';
import isArray from 'lodash/isArray';

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
    children: PropTypes.any,
  };

  static defaultProps = {
    value: null,
    tabs: [],
    children: null,
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
    const { value, onChange, children, tabs, ...props } = this.props;

    return (
      <MaterialTabs
        className="tabs"
        {...props}
        value={this.getSelectedIndex()}
        onChange={this.onChange}
      >
        {this.renderTabs()}
        {children}
      </MaterialTabs>
    );
  }
}
