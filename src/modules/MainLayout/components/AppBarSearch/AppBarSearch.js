import './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from 'consts/icons';
import IconButton from 'libs/ui/IconButton/IconButton';
import { Input } from '@material-ui/core';
import ReactDOM from 'react-dom';
import onClickOutside from 'react-onclickoutside';

import { Keys } from 'react-keydown';
const { ESC } = Keys; // optionally get key codes from Keys lib to check against later

class AppBarSearch extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string
  };

  static defaultProps = {
    placeholder: 'Search'
  };

  constructor(props) {
    super(props);

    this.state = {
      expandSearch: false,
      focused: false
    };
  }

  onExpandSearch = () => {
    const node = ReactDOM.findDOMNode(this.searchInputRef).firstChild;
    node.focus();
    node.value = '';
    this.setState({
      expandSearch: true
    });
  };

  onInputKeyPress = event => {
    event = event || window.event;

    if (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === ESC) {
      this.onFoldSearch();
    }
  };

  handleClickOutside = () => {
    this.onFoldSearch();
  };

  onFoldSearch = () => {
    if (this.state.expandSearch && !this.props.value) {
      this.setState({
        expandSearch: false
      });
    }
  };

  cleanAndFold = () => {
    this.props.onChange('');
    const node = ReactDOM.findDOMNode(this.searchInputRef).firstChild;
    node.value = '';
    this.setState({
      expandSearch: false
    });
  };

  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    const { className, value, placeholder } = this.props;
    const { expandSearch } = this.state;

    const classes = classnames(className);

    return (
      <div className={classes}>
        <span key="search-input-plug" />
        <label
          key="search-input"
          className={classnames('search-input', {
            expanded: expandSearch || value
          })}
        >
          <IconButton
            color="inherit"
            icon={icons.SEARCH}
            onClick={!expandSearch ? this.onExpandSearch : this.onFoldSearch}
          />
          <Input
            value={value}
            ref={input => {
              this.searchInputRef = input;
            }}
            className="search-value-input"
            onChange={this.onChange}
            placeholder={placeholder}
            onKeyDown={this.onInputKeyPress}
          />
          <IconButton
            color="inherit"
            className="icon-close"
            icon={icons.CLOSE}
            onClick={this.cleanAndFold}
          />
        </label>
      </div>
    );
  }
}

export default onClickOutside(AppBarSearch);
