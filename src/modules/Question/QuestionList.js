import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {fetchQuestions} from './actions';


import Card from 'libs/ui/Card';
import STRINGS from './strings';
import Table from "libs/ui/Table/Table";
import Button from "../../libs/ui/Button/Button";
import {deleteQuestion} from "modules/Question/actions";
import {toastr} from 'react-redux-toastr'
import {getQuestions, getQuestionsIds, getQuestionsLoading} from "modules/Question/getters";
import {injectIntl} from 'react-intl'
import messages from './messages';

class QuestionList extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }

  getDataTable() {
    const {questionsIds, questions, questionsLoading} = this.props;
    const columns = [
      {
        id: 'index',
        content: 'Index'
      },
      {
        id: 'question',
        content: 'Question',
      },
      {
        id: 'description',
        content: 'Description',
      },
    ];

    const rows = questionsIds.map((questionId, index) => {
      const { question, description} = questions[questionId];
      return {
        id: questionId,
        index: index + 1,
        question,
        description,
        isDeleting: questionsLoading[questionId],
      }
    });

    return {
      columns,
      rows,
    }
  }

  onDeleteQuestion = (questionId) => {
    const onSuccess = () => {toastr.success(STRINGS.HEADER.QUESTIONS_LIST, STRINGS.MESSAGES.QUESTION_DELETE_SUCCESS)};
    const onFailure = () => {toastr.error(STRINGS.HEADER.QUESTIONS_LIST, STRINGS.MESSAGES.QUESTION_DELETE_FAILURE)};

    this.props.deleteQuestion(questionId, onSuccess, onFailure)
  };


  render() {
    const {columns, rows} = this.getDataTable();
    const { intl } = this.props;

    return (
      <Card title={intl.formatMessage(messages.questionListHeader)}>
        <Table
          columns={columns}
          rows={rows}
          onClickEditRow={(row) => this.props.history.push(`/question/${row.id}/edit`)}
          onClickDeleteRow={this.onDeleteQuestion}
        />
        <Button onClick={() => this.props.history.push(`/question/add`)}>{intl.formatMessage(messages.ADD_QUESTION)}</Button>
      </Card>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    questions: getQuestions(state),
    questionsIds: getQuestionsIds(state),
    questionsLoading: getQuestionsLoading(state),
  }
};

const mapDispatchToProps = {
  fetchQuestions,
  deleteQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionList))