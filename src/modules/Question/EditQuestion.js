import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { fetchQuestion } from 'modules/Question/utils/actions';
import QuestionForm, { MODES } from 'modules/Question/QuestionForm';
import {
  getQuestion,
  getQuestionLoading
} from 'modules/Question/utils/getters';

class EditQuestion extends Component {
  componentWillMount() {
    const { questionId } = this.props;
    this.props.fetchQuestion(questionId);
  }

  render() {
    const { loading, question } = this.props;

    if (loading) return <div>loading</div>;

    return <QuestionForm mode={MODES.EDIT} question={question} />;
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
  fetchQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withRouter(EditQuestion)
);
