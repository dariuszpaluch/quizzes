import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { addQuestion } from 'modules/Question/utils/actions';
import QuestionForm, { MODES } from 'modules/Question/QuestionForm';
import paths from 'consts/paths';

class AddQuestion extends Component {
  goBack = () => {
    if (this.props.mode !== 'simple') this.props.history.push(paths.QUESTIONS);
  };

  onSave = (data) => {
    return this.props.addQuestion(data, data => {
      this.goBack();
    });
  };

  render() {
    return <QuestionForm
      mode={MODES.EDIT}
      onSave={this.onSave}
    />;
  }
}

const mapDispatchToProps = {
  addQuestion
};

export default connect(null, mapDispatchToProps)(withRouter(AddQuestion));
