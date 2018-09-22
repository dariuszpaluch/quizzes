import React, { Component } from 'react';
import { connect } from 'react-redux';

import { injectIntl } from 'react-intl';
import { compose } from 'recompose';

import { addQuestion } from './utils/actions';
import QuestionForm, { MODES } from './forms/QuestionForm';
import paths from 'consts/paths';
import Card from 'libs/ui/Card/Card';

import messages from './utils/messages';
class AddQuestion extends Component {
  goBack = () => {
    if (this.props.mode !== 'simple') this.props.history.push(paths.QUESTIONS);
  };

  onSave = data => {
    return this.props.addQuestion(data, data => {
      this.goBack();
    });
  };

  render() {
    const { intl } = this.props;

    return (
      <div className="row center-xs no-space-xs" >
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-7">
          <Card className="add-question" title={intl.formatMessage(messages.ADD_QUESTION)}>
            <QuestionForm mode={MODES.EDIT} onSave={this.onSave} />
          </Card>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  addQuestion
};

export default compose(
  injectIntl,
  connect(
    null,
    mapDispatchToProps
  )
)(AddQuestion);
