import React, { Component } from 'react';
import MainLayout from 'modules/MainLayout/MainLayout';
import { connect } from 'react-redux';

import { getAppBarTitle } from './utils/getters';
import { isUserLoggedIn } from 'modules/Auth/reducer';
import { withRouter } from 'react-router-dom';

class SmartMainLayout extends Component {
  render() {
    const { title, userLoggedIn, children } = this.props;

    return (
      <MainLayout appBarTittle={title} hideMenu={!userLoggedIn}>
        {children}
      </MainLayout>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    title: getAppBarTitle(state),
    userLoggedIn: isUserLoggedIn(state)
  };
};

const mapDispatchToProps = {};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SmartMainLayout)
);
