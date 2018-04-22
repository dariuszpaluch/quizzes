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

  onClickAddTest = () => {
    this.props.history.push(`${this.props.location.pathname}/add`);
  };

  render() {
    const { intl, tests, testsIds } = this.props;


    return (
      <MainLayout
        appBarTittle={intl.formatMessage(messages.TESTS_LIST_HEADER)}
      >
        <div>
          {testsIds.map((testId, index) => {
            const test = tests[testId];

            return (
              <Link
                key={test.id || index}
                to={`/tests/${testId}`}
              >
                <TestDescriptionCard
                  test={test}
                />
              </Link>

            )
          })}
        </div>
        <FloatButton icon={icons.ADD} onClick={this.onClickAddTest}/>
      </MainLayout>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    testsIds: getTestsIds(state),
    tests: getTests(state)
  }
};

const mapDispatchToProps = {
  getTestsRequest
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(withRouter(TestList)));