import './tests.scss';

import React, { Component } from 'react';
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

class TestList extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentWillMount() {
    this.props.getTestsRequest();
  }

  componentDidMount() {
    this.updateAppBar();
  }

  onChangeFilter = query => {
    this.setState({
      questionsQuery: query
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
    this.props.history.push(`${this.props.location.pathname}/add`);
  };

  renderTestList() {
    const { intl, tests, testsIds } = this.props;

    return (
      <div>
        {testsIds.map((testId, index) => {
          const test = tests[testId];

          return (
            <Link key={test.id || index} to={`/tests/${testId}`}>
              <TestDescriptionCard test={test} />
            </Link>
          );
        })}
      </div>
    );
  }

  render() {
    const { intl, tests, testsIds } = this.props;

    return (
      <div>
        {this.renderTestList()}
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

TestList = connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(withRouter(TestList))
);

export default MainLayoutContextWrapper(TestList);
