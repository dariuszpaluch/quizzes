import React, { Component } from 'react';
import MainLayout from 'modules/MainLayout/MainLayout';
import { connect } from 'react-redux';

import { getAppBarTitle } from './utils/getters';
import { isUserLoggedIn } from 'modules/Auth/reducer';
import { withRouter } from 'react-router-dom';

import MainLayoutContext from './MainLayoutContext';

class SmartMainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Quizzes',
      appBarActions: {}
    };
  }

  setTitle = title => {
    this.setState({ title });
  };

  setAppBarActions = appBarActions => {
    this.setState({ appBarActions });
  };

  restoreDefaultAppBar = () => {
    this.setState({
      title: undefined,
      appBarActions: {}
    });
  };

  render() {
    const { userLoggedIn, children } = this.props;
    const { title, appBarActions } = this.state;

    return (
      <div>
        <MainLayout
          appBarTittle={title}
          appBarButtons={appBarActions}
          hideMenu={!userLoggedIn}
        >
          <MainLayoutContext.Provider
            value={{
              setTitle: this.setTitle,
              setAppBarActions: this.setAppBarActions,
              restoreDefaultAppBar: this.restoreDefaultAppBar
            }}
          >
            {children}
          </MainLayoutContext.Provider>
        </MainLayout>
      </div>
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
