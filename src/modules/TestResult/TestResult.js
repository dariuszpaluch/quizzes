import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';

class TestResult extends Component {
  static propTypes = {
  };
  
  static defaultProps = {
  };

  constructor(props) {
    super(props);
    
    this.state = {
    };
  }

  render() {
    return(
      <div></div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  }
};

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResult);
