import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from 'modules/Question/actions';


import { deleteQuestion } from 'modules/Question/actions';
import { getQuestions, getQuestionsIds, getQuestionsLoading } from 'modules/Question/getters';
import { injectIntl } from 'react-intl'
import SimpleQuestionlist from 'modules/Question/components/SimpleQuestionList';
import ChipList from 'libs/ui/ChipList';
import filter from 'lodash/filter';

class QuestionList extends Component {
  componentWillMount() {
    this.props.fetchQuestions();
  }


  onDeleteChip = (deletedChipQuestionId) => {
    const { selectedIds } = this.props;

    this.props.onChangeSelect(filter(selectedIds, questionId => questionId !== deletedChipQuestionId));
  };

  render() {
    const { intl } = this.props;
    const { onChangeSelect, selectedIds, questions, questionsIds } = this.props;

    const chips = selectedIds.map(questionId => {
      const question = questions[questionId];
      return {
        label: question.question,
        id: question.id,
      };
    });

    return (
      <div>
        <ChipList
          onDeleteChip={this.onDeleteChip}
          chips={chips}

        />
        <SimpleQuestionlist
          onChangeSelect={onChangeSelect}
          selectedIds={selectedIds}
          questions={questions}
          questionsIds={questionsIds}
        />
      </div>
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