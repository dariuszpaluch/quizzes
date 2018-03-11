
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withRouter} from "react-router-dom";
import {fetchQuestion} from "modules/Question/actions";
import QuestionForm from "modules/Question/QuestionForm";
import {getQuestion, getQuestionLoading} from "modules/Question/getters";

class EditQuestion extends Component {
  componentWillMount() {
    const { questionId } = this.props;
    this.props.fetchQuestion(questionId);
  }



  render() {
    const { loading, question } = this.props;

    if(loading)
      return <div>loading</div>;

    return (
      <QuestionForm
        mode={QuestionForm.MODES.EDIT}
        question={question}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const questionId = ownProps.match.params.questionId;

  return {
    question: getQuestion(state, questionId),
    questionId,
    loading: getQuestionLoading(state, questionId),
  }
};

const mapDispatchToProps = {
  fetchQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditQuestion));