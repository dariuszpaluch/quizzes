import './tests.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTestsRequest } from 'modules/Tests/utils/actions';
import { getTests, getTestsIds } from 'modules/Tests/utils/getters';
import { injectIntl } from 'react-intl';
import messages from 'modules/Tests/utils/messages';
import TestDescriptionCard from 'modules/Tests/components/TestDescriptionCard/TestDescriptionCard';
import icons from 'consts/icons';
import FloatButton from 'libs/ui/FloatButton/FloatButton';
import MainLayout from 'modules/MainLayout/MainLayout';
import { Link, withRouter } from 'react-router-dom';
import { MainLayoutContextWrapper } from 'modules/MainLayout/MainLayoutContext';
import TestsList from 'modules/Tests/components/TestsList/TestsList';
import { testsPaths } from 'consts/paths';
import parsePath from 'utils/parsePath';

class Tests extends Component {
  static propTypes = {
    onlyUserTests: PropTypes.bool,
  };

  static defaultProps = {
    onlyUserQuizzes: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      filterQuery: '',
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
        title: intl.formatMessage(messages.TESTS_LIST_HEADER),
        onSearch: this.onChangeFilter
      });
    }
  }

  onClickAddTest = () => {
    this.props.history.push(`${this.props.match.path}${testsPaths.TEST_ADD}`);
  };

  makeItemLinkTo = (testId) => parsePath(`${this.props.match.path}${testsPaths.TEST}`, {
    testId
  });

  render() {
    const { intl, tests, testsIds } = this.props;
    const { filterQuery } = this.state;

    return (
      <div>
        <TestsList
          tests={tests}
          testsIds={testsIds}
          makeItemLinkTo={this.makeItemLinkTo}
          filterQuery={filterQuery}
        />
        <FloatButton icon={icons.ADD} onClick={this.onClickAddTest} />
      </div>
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
  getTestsRequest
};

Tests =  connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(Tests)));

export default MainLayoutContextWrapper(Tests);
