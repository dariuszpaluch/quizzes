import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Button from 'material-ui/Button';

export default class Page extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div>
        <Button>Hello World</Button>
      </div>
    );
  }
}
