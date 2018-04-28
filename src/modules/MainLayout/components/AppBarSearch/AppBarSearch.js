import './style.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import icons from 'consts/icons';
import IconButton from 'libs/ui/IconButton/IconButton';
import { Input } from 'material-ui';
import ReactDOM from 'react-dom';

export default class AppBarSearch extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      expandSearch: false
    };
  }

  onExpandSearch = () => {
    const node = ReactDOM.findDOMNode(this.searchInputRef).firstChild;
    node.focus();

    this.setState({
      expandSearch: true
    });
  };

  onFoldSearch = () => {
    this.setState({
      expandSearch: false
    });
    onChange('');
  };

  render() {
    const { className, onChange } = this.props;
    const { expandSearch } = this.state;

    const classes = classnames(className);

    return (
      <div className={classes}>
        <span key="search-input-plug" />
        <label
          key="search-input"
          className={classnames('search-input', {
            expanded: expandSearch
          })}
        >
          <IconButton
            color="inherit"
            icon={icons.SEARCH}
            onClick={!expandSearch ? this.onExpandSearch : this.onFoldSearch}
          />
          <Input
            ref={input => {
              this.searchInputRef = input;
            }}
            className="search-value-input"
            onChange={onChange}
            placeholder="search"
            type="search"
          />
          <IconButton
            color="inherit"
            icon={icons.CLOSE}
            onClick={this.onFoldSearch}
          />
        </label>
      </div>
    );
  }
}
