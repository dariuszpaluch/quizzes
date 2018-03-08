import './tabs.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';

import MaterialTabs, {Tab} from 'material-ui/Tabs';

import findIndex from 'lodash/findIndex';

export default class Tabs extends Component {
  static propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.func,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      })
    )
  };

  static defaultProps = {
    value: null,
  };

  constructor(props) {
    super(props);

    this.getSelectedIndex = ::this.getSelectedIndex;
  }

  renderTabs() {
    const {
      tabs
    } = this.props;

    return tabs.map(tab => <Tab label={tab.label} key={tab.value}/>);
  }

  getSelectedIndex() {
    const {
      tabs,
      value,
    } = this.props;

    return findIndex(tabs, tab => tab.value === value);
  }

  onChange = (event, value) => {
    const {
      tabs
    } = this.props;

    this.props.onChange(tabs[value]);
  };

  render() {
    const {
      value,
      onChange,
      children,
      tabs,
      ...props,
    } = this.props;

    return (
      <MaterialTabs
        className="tabs"
        {...props}
        value={ this.getSelectedIndex() }
        onChange={ this.onChange }
      >
        {this.renderTabs()}
        {children}
      </MaterialTabs>
    )
  }
}