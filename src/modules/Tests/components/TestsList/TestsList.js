import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import { Link } from 'react-router-dom';

import TestDescriptionCard from '../TestDescriptionCard/TestDescriptionCard';

export default class TestsList extends Component {
  static propTypes = {
    testsIds: PropTypes.array,
    tests: PropTypes.object,
    makeItemLinkTo: PropTypes.func,
  };

  static defaultProps = {
    testsIds: [],
    tests: {},
    makeItemLinkTo: null,
  };

  render() {
    const { className, testsIds, tests, makeItemLinkTo } = this.props;

    const classes = classnames('test-list', className);

    return(
      <div className={classes}>
          {testsIds.map((testId, index) => {
            const test = tests[testId];
            const content = <TestDescriptionCard test={test} />;

            if (!makeItemLinkTo)
              return content;

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
