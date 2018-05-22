import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import TestDescriptionCard from '../TestDescriptionCard/TestDescriptionCard';
import stringInclude from 'utils/stringInclude';
import messages from 'modules/Tests/utils/messages';

import size from 'lodash/size';
import filter from 'lodash/filter';

import { injectIntl } from 'react-intl';
import Typography from 'libs/ui/Typography/Typography';

class TestsList extends Component {
  static propTypes = {
    testsIds: PropTypes.array,
    tests: PropTypes.object,
    makeItemLinkTo: PropTypes.func,
    filterQuery: PropTypes.string
  };

  static defaultProps = {
    testsIds: [],
    tests: {},
    makeItemLinkTo: null,
    filterQuery: ''
  };

  renderInfoLabel(content) {
    return (
      <Typography className="information-label" variant="display1">
        {content}
      </Typography>
    );
  }

  render() {
    const { className, testsIds, tests, makeItemLinkTo, filterQuery, intl } = this.props;

    const classes = classnames('test-list', className);

    if (!size(testsIds))
      return this.renderInfoLabel(intl.formatMessage(messages.NO_TESTS_INFORMATION));

    let _testsIds = testsIds;
    if (filterQuery) {
      _testsIds = filter(_testsIds, testId => stringInclude(tests[testId].name, filterQuery));
    }

    if (filterQuery && !size(_testsIds))
      return this.renderInfoLabel(
        intl.formatMessage(messages.NO_MATCHING_TESTS_TO_QUERY, {
          query: filterQuery
        })
      );

    return (
      <div className={classes}>
        {_testsIds.map((testId, index) => {
          const test = tests[testId];
          const content = <TestDescriptionCard test={test} />;

          if (!makeItemLinkTo) return content;

          return (
            <Link key={test.id || index} to={makeItemLinkTo(testId)}>
              {content}
            </Link>
          );
        })}
      </div>
    );
  }
}

export default injectIntl(TestsList);
