import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from './utils/actions';

import Card from 'libs/ui/Card';
import STRINGS from './utils/strings';
import { deleteQuestion } from 'modules/Question/utils/actions';
import { toastr } from 'react-redux-toastr';
import { setAppBarTitle } from 'modules/MainLayout/utils/actions';
import {
  getQuestions,
  getQuestionsIds,
  getQuestionsLoading
} from 'modules/Question/utils/getters';
import { injectIntl } from 'react-intl';
import messages from './utils/messages';
import SimpleQuestionlist from 'modules/Question/components/SimpleQuestionList';
import icons from 'consts/icons';
import FloatButton from 'libs/ui/FloatButton/FloatButton';
import parsePath from 'utils/parsePath';
import paths, { questionPaths } from 'consts/paths';
import { withRouter } from 'react-router-dom';
import { MainLayoutContextWrapper } from 'modules/MainLayout/MainLayoutContext';

import filter from 'lodash/filter';
import stringInclude from 'utils/stringInclude';

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsQuery: null
    };
  }

  componentWillMount() {
    const { intl } = this.props;
    this.props.setAppBarTitle(
      intl.formatMessage(messages.QUESTION_LIST_HEADER)
    );
    this.props.fetchQuestions();
  }

  componentDidMount() {
    this.updateAppBar();
  }

  onChangeFilter = query => {
    this.setState({
      questionsQuery: query
    });
  };

  updateAppBar() {
    const { intl, mainLayoutContext } = this.props;
    if (!!mainLayoutContext) {
      const { setTitle, onSearch } = mainLayoutContext;

      setTitle(intl.formatMessage(messages.QUESTION_LIST_HEADER));
      onSearch(this.onChangeFilter);
    }
  }

  onDeleteQuestion = questionId => {
    const onSuccess = () => {
      toastr.success(
        STRINGS.HEADER.QUESTIONS_LIST,
        STRINGS.MESSAGES.QUESTION_DELETE_SUCCESS
      );
    };
    const onFailure = () => {
      toastr.error(
        STRINGS.HEADER.QUESTIONS_LIST,
        STRINGS.MESSAGES.QUESTION_DELETE_FAILURE
      );
    };

    this.props.deleteQuestion(questionId, onSuccess, onFailure);
  };

  onClickAddQuestion = () => {
    this.props.history.push(`${paths.QUESTIONS}${questionPaths.ADD_QUESTION}`);
  };

  goEditQuestion = questionId => {
    const { history, match, intl } = this.props;

    history.push(
      parsePath(`${match.url}${questionPaths.EDIT_QUESTION}`, { questionId })
    );
  };

  render() {
    const { onChangeSelect, selectedIds, questions, questionsIds } = this.props;
    const { questionsQuery } = this.state;

    return (
      <Card className="question-list" noSpace>
        <SimpleQuestionlist
          onChangeSelect={onChangeSelect}
          selectedIds={selectedIds}
          questions={questions}
          questionsIds={questionsIds}
          onEdit={this.goEditQuestion}
          onDelete={this.onDeleteQuestion}
          filterQuery={questionsQuery}
        />
        <FloatButton icon={icons.ADD} onClick={this.onClickAddQuestion} />
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    questions: getQuestions(state),
    questionsIds: getQuestionsIds(state),
    questionsLoading: getQuestionsLoading(state)
  };
};

const mapDispatchToProps = {
  fetchQuestions,
  deleteQuestion,
  setAppBarTitle
};

QuestionList = connect(mapStateToProps, mapDispatchToProps)(
  withRouter(injectIntl(QuestionList))
);

export default MainLayoutContextWrapper(QuestionList);
