import './tests.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTestsToCompleteRequest } from 'modules/Tests/utils/actions';
import { getTests, getTestsIds } from 'modules/Tests/utils/getters';
import { injectIntl } from 'react-intl';
import messages from 'modules/Tests/utils/messages';
import { withRouter } from 'react-router-dom';
import { MainLayoutContextWrapper } from 'modules/MainLayout/MainLayoutContext';
import TestsList from 'modules/Tests/components/TestsList/TestsList';
import paths from 'consts/paths';
import parsePath from 'utils/parsePath';

class TestsSearchToComplete extends Component {
  static propTypes = {
    onlyUserTests: PropTypes.bool
  };

  static defaultProps = {
    onlyUserQuizzes: false
  };

  constructor(props) {
    super(props);

    this.state = {
      filterQuery: ''
    };
  }

  componentWillMount() {
    const { onlyUserTests } = this.props;
    this.props.getTestsRequest(onlyUserTests);
  }

  componentDidMount() {
    this.updateAppBar();
  }

  onChangeFilter = query => {
    this.setState({
      filterQuery: query
    });
  };

  updateAppBar() {
    const { intl, mainLayoutContext } = this.props;
    if (!!mainLayoutContext) {
      const { setAppBarData } = mainLayoutContext;
      setAppBarData({
        title: intl.formatMessage(messages.TESTS_SEARCH_TO_COMPLETE_LIST_HEADER),
        onSearch: this.onChangeFilter
      });
    }
  }

  makeItemLinkTo = testId =>
    parsePath(paths.MAKE_TEST, {
      testId
    });

  render() {
    const { intl, tests, testsIds } = this.props;
    const { filterQuery } = this.state;

    return (
      <TestsList
        tests={tests}
        testsIds={testsIds}
        makeItemLinkTo={this.makeItemLinkTo}
        filterQuery={filterQuery}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testsIds: getTestsIds(state),
    tests: getTests(state)
  };
};

const mapDispatchToProps = {
  getTestsRequest: getTestsToCompleteRequest
};

TestsSearchToComplete = connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(withRouter(TestsSearchToComplete))
);

export default MainLayoutContextWrapper(TestsSearchToComplete);
