import './test_details.scss';

import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getTest } from 'modules/Tests/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import messages from 'modules/Tests/utils/messages';
import { injectIntl } from 'react-intl';
import { deleteTest, getTestDetail } from 'modules/Tests/utils/actions';
import Card from 'libs/ui/Card/Card';
import icons from 'consts/icons';
import paths, { testsPaths } from 'consts/paths';
import { MainLayoutContextWrapper } from 'modules/MainLayout/MainLayoutContext';
import Button from 'libs/ui/Button/Button';
import copy from 'copy-to-clipboard';
import parsePath from 'utils/parsePath';
import { Link, withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import Loading from 'libs/ui/Loading/Loading';
import UserResultsTable from 'modules/Tests/components/UserResultsTable/UserResultsTable';
import globalMessages from 'utils/globalMessages';
import Tabs from 'libs/ui/Tabs/Tabs';

import { TabContainer } from '@material-ui/core';
import TestResultsStatistics from 'modules/Tests/components/TestResultsStatistics/TestResultsStatistics';
class TestDetail extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    const { intl } = this.props;

    this.tabs = [
      {
        label: intl.formatMessage(messages.TEST_SUMMARY_TAB_RESULT),
        value: 'results'
      },
      {
        label: intl.formatMessage(messages.TEST_SUMMARY_TAB_STATISTICS),
        value: 'statistics'
      }
    ];

    this.state = {
      activeTabValue: this.tabs[0].value
    };

    this.appBarButtons = {
      left: {
        onClick: this.onClickGoBack,
        icon: icons.ARROW_BACK
      }
    };
  }

  componentDidMount() {
    this.props.getTestDetail(this.props.testId);
    this.updateAppBar();
  }

  componentWillUpdate(nextProps, nextState, nextContext) {
    if (this.props.test.name !== nextProps.test.name) {
      this.updateAppBar(nextProps);
    }
  }

  updateAppBar(props) {
    const { intl, mainLayoutContext, test } = props || this.props;
    if (!!mainLayoutContext) {
      const { setAppBarData } = mainLayoutContext;

      setAppBarData({
        title: intl.formatMessage(messages.TEST_DETAIL_HEADER, {
          name: test.name
        }),
        appBarActions: this.appBarButtons
      });
    }
  }

  onClickGoBack = () => {
    this.props.history.push(paths.TESTS);
  };

  copyTestUrlToClipboard = () => {
    const { test, location, intl } = this.props;

    let hosturl = window.location.href;
    hosturl = hosturl.replace(location.pathname, '');
    const makeTestUrl = hosturl + parsePath(paths.MAKE_TEST, { testId: test.id });

    copy(makeTestUrl);
    toastr.success(
      intl.formatMessage(messages.TEST_DETAIL_HEADER, { name: test.name }),
      intl.formatMessage(messages.TEST_URL_COPIED_TO_CLIPBOARD)
    );
  };

  onChangeActiveTab = selectedTab => {
    this.setState({
      activeTabValue: selectedTab.value
    });
  };

  deleteTest = () => {
    const { testId } = this.props;
    const onSuccess = () => {
      this.props.history.push(paths.TESTS);
    };

    this.props.deleteTest(testId, onSuccess);

  };

  render() {
    const { intl, test, match } = this.props;

    if (!test.id) return <Loading center />;

    return (
      <Card className="test-details">
        <div className="actions-buttons">
          <Button icon={icons.SHARE} onClick={this.copyTestUrlToClipboard}>
            {intl.formatMessage(messages.TEST_DETAIL_SHARE_TEST_BY_URL)}
          </Button>
          <Link to={parsePath(`${match.url}${testsPaths.TEST_EDIT}`, { testId: test.id })}>
            <Button>{intl.formatMessage(globalMessages.EDIT)}</Button>
          </Link>
          <Button onClick={this.deleteTest}>{intl.formatMessage(globalMessages.DELETE)}</Button>
        </div>
        <Tabs
          tabs={this.tabs}
          value={this.state.activeTabValue}
          onChange={this.onChangeActiveTab}
          indicatorColor="primary"
          textColor="inherit"
        />
        {this.state.activeTabValue === this.tabs[0].value && (
          <UserResultsTable userAnswers={test.userAnswers} />
        )}
        {this.state.activeTabValue === this.tabs[1].value && <TestResultsStatistics test={test} />}
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const testId = ownProps.match.params.testId;

  return {
    test: getTest(state, testId) || {},
    testId
  };
};

const mapDispatchToProps = {
  getTestDetail,
  deleteTest
};

TestDetail = withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(TestDetail)));

export default MainLayoutContextWrapper(TestDetail);
