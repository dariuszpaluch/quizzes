import React, { Component } from 'react';
import { connect } from 'react-redux';

import Card from 'libs/ui/Card/Card';
import MainLayout from 'modules/MainLayout/MainLayout';

class Dashboard extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <MainLayout>
        <Card
          title="Dashboard"
        >

        </Card>
      </MainLayout>

    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);