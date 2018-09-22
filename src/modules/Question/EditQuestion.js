import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { fetchQuestion, saveQuestion } from 'modules/Question/utils/actions';
import QuestionForm, { MODES } from 'modules/Question/forms/QuestionForm';
import { getQuestion, getQuestionLoading } from 'modules/Question/utils/getters';
import paths from 'consts/paths';

class EditQuestion extends Component {
  componentWillMount() {
    const { questionId } = this.props;
    this.props.fetchQuestion(questionId);
  }

  goBack = () => {
    if (this.props.mode !== 'simple') this.props.history.push(paths.QUESTIONS);
  };

  onSave = (data) => {
    const { questionId } = this.props;
    return this.props.saveQuestion(questionId, data, data => {
      this.goBack();
    });
  };

  render() {
    const { loading, question } = this.props;

    if (loading) return <div>loading</div>;

    return <QuestionForm mode={MODES.EDIT} question={question} onSave={this.onSave}/>;
  }
}

const mapStateToProps = (state, ownProps) => {
  const questionId = ownProps.match.params.questionId;

  return {
    question: getQuestion(state, questionId),
    questionId,
    loading: getQuestionLoading(state, questionId)
  };
};

const mapDispatchToProps = {
  fetchQuestion,
  saveQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditQuestion));
