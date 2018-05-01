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
      appBarActions: {},
      onSearch: undefined
    };
  }

  setTitle = title => {
    this.setState({ title });
  };

  setAppBarActions = appBarActions => {
    this.setState({ appBarActions });
  };

  setOnSearch = searchCallBack => {
    this.setState({
      onSearch: searchCallBack
    });
  };

  restoreDefaultAppBar = () => {
    this.setState({
      title: undefined,
      appBarActions: {},
      onSearch: undefined
    });
  };

  setAppBarData = ({ title, appBarActions, onSearch }) => {
    this.setState({
      title,
      appBarActions,
      onSearch
    });
  };

  render() {
    const { userLoggedIn, children } = this.props;
    const { title, appBarActions, onSearch } = this.state;

    return (
      <MainLayout
        appBarTittle={title}
        appBarButtons={appBarActions}
        hideMenu={!userLoggedIn}
        onSearch={onSearch}
      >
        <MainLayoutContext.Provider
          value={{
            setTitle: this.setTitle,
            setAppBarActions: this.setAppBarActions,
            restoreDefaultAppBar: this.restoreDefaultAppBar,
            onSearch: this.setOnSearch,
            setAppBarData: this.setAppBarData
          }}
        >
          {children}
        </MainLayoutContext.Provider>
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
