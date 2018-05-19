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
      searchValue: '',
    };
  }

  componentWillMount() {
    const onLoginView = [paths.INDEX, `${paths.INDEX}${authPaths.SIGN_IN}`, `${paths.INDEX}${authPaths.SIGN_UP}`].indexOf(this.props.location.pathname) >= 0;

    if (this.props.userLoggedIn && onLoginView) {
      this.props.history.push(paths.DASHBOARD)
    }

    if (!this.props.userLoggedIn && !onLoginView) {
      this.props.history.push(paths.INDEX)
    }
  }

  componentDidMount() {
    if(this.props.userLoggedIn) {
      this.props.getUserInfo();
    }
  }

  componentWillReceiveProps(nextProps, nextState) {
    if(nextProps.userLoggedIn && nextProps.userLoggedIn !== this.props.userLoggedIn) {
      this.props.getUserInfo();
    }
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
      onSearch: undefined,
      searchValue: '',
    });
  };

  setAppBarData = ({ title, appBarActions, onSearch }) => {
    this.setState({
      title,
      appBarActions,
      onSearch,
      searchValue: '',
    });
  };

  onChangeSearchValue = (searchValue) => {
    this.setState({
      searchValue
    });

    this.state.onSearch && this.state.onSearch(searchValue);
  };

  render() {
    const { userLoggedIn, children,  userData } = this.props;
    const { title, appBarActions, onSearch, searchValue } = this.state;

    return (
      <MainLayout
        appBarTittle={title}
        appBarButtons={appBarActions}
        hideMenu={!userLoggedIn}
        onSearch={onSearch && this.onChangeSearchValue}
        searchValue={searchValue}
        userData={ userData}
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
  getUserInfo,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SmartMainLayout));
