import React, { Component } from 'react';

import { connect } from 'react-redux';
import { getTest } from 'modules/Tests/utils/getters';
import MainLayout from 'modules/MainLayout/MainLayout';
import messages from 'modules/Tests/utils/messages';
import { injectIntl } from 'react-intl';
import { getTestDetail } from 'modules/Tests/utils/actions';
import Card from 'libs/ui/Card/Card';
import icons from 'consts/icons';
import paths from 'consts/paths';

class TestDetail extends Component {
  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
    };

    this.appBarButtons = {
      left: {
        onClick: this.onClickGoBack,
        icon: icons.ARROW_BACK,
      },
    };
  }

  componentWillMount() {
    this.props.getTestDetail(this.props.testId);
  }

  onClickGoBack = () => {
    this.props.history.push(paths.TESTS);
  };

  render() {
    const {
      intl,
      test,
    } = this.props;

    return(
      <MainLayout
        appBarTittle={intl.formatMessage(messages.TEST_DETAIL_HEADER, { name: test.name})}
        appBarButtons={this.appBarButtons}

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