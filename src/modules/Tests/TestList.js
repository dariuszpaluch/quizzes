import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';

import { getTestsRequest } from 'modules/Tests/utils/actions';
import Card from 'libs/ui/Card/Card';
import { getTests, getTestsIds } from 'modules/Tests/utils/getters';
import { injectIntl } from 'react-intl';
import messages from 'modules/Tests/utils/messages';
import TestDescriptionCard from 'modules/Tests/components/TestDescriptionCard/TestDescriptionCard';
import Button from 'libs/ui/Button/Button';
import IconButton from 'libs/ui/IconButton/IconButton';
import icons from 'consts/icons';
import Icon from 'libs/ui/Icon/Icon';
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