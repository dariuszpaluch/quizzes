import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { getTest } from 'modules/Tests/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import messages from 'modules/Tests/utils/messages';
import { injectIntl } from 'react-intl';
import { getTestDetail } from 'modules/Tests/utils/actions';
import Card from 'libs/ui/Card/Card';
import icons from 'consts/icons';

class TestDetail extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.customAppBarButton = {
      onClick: this.onClickGoBack,
      icon: icons.ARROW_BACK,
    };
  }

  componentWillMount() {
    this.props.getTestDetail(this.props.testId);
  }

  onClickGoBack = () => {
    this.props.history.push('/tests');
  };

  render() {
    const {
      intl,
      test,
    } = this.props;

    console.log(test.name);

    return(
      <MainLayout
        appBarTittle={intl.formatMessage(messages.TEST_DETAIL_HEADER, { name: test.name})}
        customAppBarButton={this.customAppBarButton}
      >
        <Card>
        </Card>
      </MainLayout>
  );
  }
}

const mapStateToProps = (state, ownProps) => {
  const testId = ownProps.match.params.testId;

  return {
    test: getTest(state, testId) || {},
    testId,
  }
};

const mapDispatchToProps = {
  getTestDetail
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TestDetail));