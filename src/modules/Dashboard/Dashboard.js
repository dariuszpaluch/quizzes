import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from 'libs/ui/Card/Card';

class Dashboard extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <Card title="Dashboard" />;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
