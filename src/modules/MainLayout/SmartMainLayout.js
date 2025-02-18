import React, { Component } from 'react';
import MainLayout from 'modules/MainLayout/MainLayout';
import { connect } from 'react-redux';

import { isUserLoggedIn, getUserData } from 'modules/Auth/reducer';
import { withRouter } from 'react-router-dom';

import MainLayoutContext from './MainLayoutContext';
import SETTINGS from 'settings';
import paths, { authPaths } from 'consts/paths';
import { getUserInfo } from 'modules/Auth/actions';

class SmartMainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: SETTINGS.APP_NAME,
      appBarActions: {},
      onSearch: undefined,
      searchValue: ''
    };

    this.timeout = null;
  }

  componentDidMount() {
    this.props.getUserInfo();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.userLoggedIn && nextProps.userLoggedIn !== this.props.userLoggedIn) {
      this.props.getUserInfo();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
    }
  }

  setTitle = title => {
    this.timeout && clearTimeout(this.timeout);

    this.setState({ title });
  };

  setAppBarActions = appBarActions => {
    this.timeout && clearTimeout(this.timeout);

    this.setState({ appBarActions });
  };

  setOnSearch = searchCallBack => {
    this.timeout && clearTimeout(this.timeout);

    this.setState({
      onSearch: searchCallBack
    });
  };

  restoreDefaultAppBar = () => {
    this.timeout && clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.setState({
        title: undefined,
        appBarActions: {},
        onSearch: undefined,
        searchValue: ''
      });
    }, 100);
  };

  setAppBarData = ({ title, appBarActions, onSearch }) => {
    this.timeout && clearTimeout(this.timeout);
    this.setState({
      title,
      appBarActions,
      onSearch,
      searchValue: ''
    });
  };

  onChangeSearchValue = searchValue => {
    this.setState({
      searchValue
    });

    this.state.onSearch && this.state.onSearch(searchValue);
  };

  render() {
    const { userLoggedIn, children, userData } = this.props;
    const { title, appBarActions, onSearch, searchValue } = this.state;
    const onLoginView =
      [
        paths.INDEX,
        `${paths.INDEX}${authPaths.SIGN_IN}`,
        `${paths.INDEX}${authPaths.SIGN_UP}`
      ].indexOf(this.props.location.pathname) >= 0;

    return (
      <MainLayout
        appBarTittle={title}
        appBarButtons={appBarActions}
        hideMenu={!userLoggedIn}
        onSearch={onSearch && this.onChangeSearchValue}
        searchValue={searchValue}
        userData={userData}
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
    // title: getAppBarTitle(state),
    userData: getUserData(state),
    userLoggedIn: isUserLoggedIn(state)
  };
};

const mapDispatchToProps = {
  getUserInfo
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmartMainLayout));
