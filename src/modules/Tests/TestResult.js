import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { getTestResult } from 'utils/actions';

class TestResult extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.getTestResult(this.props.testResultId);
  }

  render() {
    return <div>TEST RESULT</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const testResultId = ownProps.match.params.testResultId;

  return {
    testResultId
  };
};

const mapDispatchToProps = {
  getTestResult
};

export default connect(mapStateToProps, mapDispatchToProps)(TestResult);
