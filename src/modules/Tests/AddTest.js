import React, { Component } from 'react';
import { connect } from 'react-redux';

import { injectIntl } from 'react-intl';
import { compose } from 'recompose';

import paths from 'consts/paths';
import Card from 'libs/ui/Card/Card';

import { addTest } from 'modules/Tests/utils/actions';
import TestForm, { MODES } from 'modules/Tests/TestForm';
class AddTest extends Component {
  goBack = () => {
    if (this.props.mode !== 'simple') this.props.history.push(paths.TESTS);
  };

  onSave = data => {
    return this.props.addTest(data, data => {
      this.goBack();
    });
  };

  render() {
    const { intl } = this.props;

    return (
      <div className="row center-xs no-space-xs">
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-7">
          <Card className="add-question">
            <TestForm mode={MODES.ADD} onSave={this.onSave} />
          </Card>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addTest
};

export default compose(injectIntl, connect(null, mapDispatchToProps))(AddTest);
