import './meteors.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';

import range from 'lodash/range';

export default class Meteors extends Component {
  static propTypes = {
    fullScreen: PropTypes.bool,
  };

  static defaultProps = {
    fullScreen: false,
  };

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderSpans(number) {
    return range(0, number).map(index => <span key={index}/>);
  }

  render() {
    const { className, fullScreen } = this.props;

    const classes = classnames(className);

    return(
      <div className={classes}>
        <div key="meteors" className={classnames('meteors-container', {
          'full-screen': fullScreen,
        })}>
          {this.renderSpans(50)}
        </div>

      </div>
    );
  }
}
