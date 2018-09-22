import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { fetchQuestion, saveQuestion } from 'modules/Question/utils/actions';
import QuestionForm, { MODES } from 'modules/Question/forms/QuestionForm';
import {
  getQuestion,
  getQuestionIsLoading,
  getQuestionLoading
} from 'modules/Question/utils/getters';
import paths from 'consts/paths';

import { pick, map } from 'lodash';
import Card from 'libs/ui/Card/Card';
import messages from 'modules/Question/utils/messages';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import Loading from 'libs/ui/Loading/Loading';

class EditQuestion extends Component {
  componentWillMount() {
    const { questionId } = this.props;
    this.props.fetchQuestion(questionId);
  }

  goBack = () => {
    if (this.props.mode !== 'simple') this.props.history.push(paths.QUESTIONS);
  };

  onSave = data => {
    const { questionId } = this.props;
    return this.props.saveQuestion(questionId, data, data => {
      this.goBack();
    });
  };

  getInitValues() {
    const { question } = this.props;

    const data = question && {
      ...pick(question, ['question', 'description', 'answers'])
    };

    data.answers = map(data.answers, answer => ({
      ...answer,
      select: answer.correct
    }));

    return data;
  }

  render() {
    const { loading, question, intl } = this.props;

    if (loading) return <Loading center />;

    return (
      <div className="row center-xs no-space-xs">
        <div className="col-xs-12 col-sm-10 col-md-9 col-lg-7">
          <Card className="add-question" title={intl.formatMessage(messages.EDIT_QUESTION)}>
            <QuestionForm
              mode={MODES.EDIT}
              question={question}
              onSave={this.onSave}
              initialValues={this.getInitValues()}
            />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const questionId = ownProps.match.params.questionId;
  const question = getQuestion(state, questionId);

  return {
    question,
    questionId,
    loading: !question || getQuestionIsLoading(state, questionId)
  };
};

const mapDispatchToProps = {
  fetchQuestion,
  saveQuestion
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(EditQuestion);
