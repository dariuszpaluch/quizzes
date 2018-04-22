import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from './utils/actions';


import Card from 'libs/ui/Card';
import STRINGS from './utils/strings';
import Table from 'libs/ui/Table/Table';
import Button from '../../libs/ui/Button/Button';
import { deleteQuestion } from 'modules/Question/utils/actions';
import { toastr } from 'react-redux-toastr'
import { getQuestions, getQuestionsIds, getQuestionsLoading } from 'modules/Question/utils/getters';
import { injectIntl } from 'react-intl'
import messages from './utils/messages';
import SimpleQuestionlist from 'modules/Question/components/SimpleQuestionList';
import icons from 'consts/icons';
import FloatButton from 'libs/ui/FloatButton/FloatButton';
import parsePath from 'utils/parsePath';
import paths, { questionPaths } from 'consts/paths';
import { withRouter } from 'react-router-dom';
import MainLayout from 'modules/MainLayout/MainLayout';

class QuestionList extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }

  getDataTable() {
    const { questionsIds, questions, questionsLoading, intl } = this.props;
    const columns = [
      {
        id: 'question',
        content: intl.formatMessage(messages.QUESTION_TABLE_CELL),
      },
      {
        id: 'description',
        content: intl.formatMessage(messages.QUESTION_DESCRIPTION_TABLE_CELL)
      },
    ];

    const rows = questionsIds.map((questionId, index) => {
      const { question, description } = questions[questionId];
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
    const onSuccess = () => {
      toastr.success(STRINGS.HEADER.QUESTIONS_LIST, STRINGS.MESSAGES.QUESTION_DELETE_SUCCESS)
    };
    const onFailure = () => {
      toastr.error(STRINGS.HEADER.QUESTIONS_LIST, STRINGS.MESSAGES.QUESTION_DELETE_FAILURE)
    };

    this.props.deleteQuestion(questionId, onSuccess, onFailure)
  };

  onClickAddQuestion = () => {
    this.props.history.push(`${paths.QUESTIONS}${questionPaths.ADD_QUESTION}`)
  };

  goEditQuestion = (questionId) => {
    const { history, match, intl, } = this.props;

    history.push(parsePath(`${match.url}${questionPaths.EDIT_QUESTION}`, {questionId}));
  };

  render() {
    const { intl } = this.props;
    const { onChangeSelect, selectedIds, questions, questionsIds } = this.props;

    return (
      <MainLayout
        appBarTittle={intl.formatMessage(messages.QUESTION_LIST_HEADER)}
      >
        <Card>
          <SimpleQuestionlist
            onChangeSelect={onChangeSelect}
            selectedIds={selectedIds}
            questions={questions}
            questionsIds={questionsIds}
            onEdit={this.goEditQuestion}
            onDelete={this.onDeleteQuestion}
          />
        </Card>
        <FloatButton icon={icons.ADD} onClick={this.onClickAddQuestion}/>
      </MainLayout>
    );

    // return (
    //   <Card title={intl.formatMessage(messages.questionListHeader)}>
    //     <Table
    //       columns={columns}
    //       rows={rows}
    //       onClickEditRow={(row) => this.props.history.push(`/question/${row.id}/edit`)}
    //       onClickDeleteRow={this.onDeleteQuestion}
    //     />
    //     <Button onClick={() => this.props.history.push(`/question/add`)}>{intl.formatMessage(messages.ADD_QUESTION)}</Button>
    //   </Card>
    // )
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(injectIntl(QuestionList)))