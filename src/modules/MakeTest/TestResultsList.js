import './test_results_list.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { fetchUserTestAnswers } from 'modules/MakeTest/utils/actions';
import Loading from 'libs/ui/Loading/Loading';
import List from 'libs/ui/List/List';
import Card from 'libs/ui/Card/Card';
import normalizeList from 'utils/normalizeList';
import { forEach } from 'lodash';
import parsePath from 'utils/parsePath';
import paths from 'consts/paths';
import { injectIntl } from 'react-intl';
import { ListItemText } from '@material-ui/core';
import Typography from 'libs/ui/Typography/Typography';
import PercentageCircle from 'components/PerentageCircle/PercentageCircle';
import size from 'lodash/size';

class TestResultsList extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      fetched: false
    };
  }

  componentDidMount() {
    this.props.fetchUserTestAnswers(this.onFetchUserTestAnswersSuccess);
  }

  onFetchUserTestAnswersSuccess = data => {
    this.setState({
      fetched: true,
      data: normalizeList(data)
    });
  };

  goToTestResult = testResultId => {
    this.props.history.push(
      parsePath(paths.TESTS_RESULT, {
        testResultId
      })
    );
  };

  getTestAnswersRows() {
    const { intl } = this.props;

    const { data } = this.state;
    const tests = data.byId;

    const rows = {};

    forEach(data.allIds, testAnswerId => {
      const testAnswer = tests[testAnswerId];

      console.log(testAnswer);

      rows[testAnswerId] = {
        className: 'list-item',
        label: (
          <div className="test-result-list-item">
            <div>
              <span className="date">{intl.formatDate(testAnswer.createdAt)}</span>
              <span>{testAnswer.test.name}</span>
            </div>
            <div>
              <PercentageCircle
                className="test-percentage-result"
                percentage={30}
                valueSize={10}
                size={40}
              />
            </div>

          </div>
        ),
        onClick: this.goToTestResult.bind(null, testAnswerId)
      };
    });

    return rows;
  }

  render() {
    if (!this.state.fetched) return <Loading center />;

    const { data } = this.state;

    console.log(this.state.data);

    return (
      <List className="test-results-list" rowsIds={data.allIds} rows={this.getTestAnswersRows()} />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  fetchUserTestAnswers
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(TestResultsList);
