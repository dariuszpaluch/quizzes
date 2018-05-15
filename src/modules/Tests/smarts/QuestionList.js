import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchQuestions } from 'modules/Question/utils/actions';

import { deleteQuestion } from 'modules/Question/utils/actions';
import { getQuestions, getQuestionsIds, getQuestionsLoading } from 'modules/Question/utils/getters';
import { injectIntl } from 'react-intl';
import SimpleQuestionlist from 'modules/Question/components/SimpleQuestionList';
import ChipList from 'libs/ui/ChipList';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';
import QuestionForm from 'modules/Question/QuestionForm';
import Modal from 'libs/ui/Modal/Modal';
import Button from 'libs/ui/Button/Button';
import STRINGS from 'modules/Question/utils/strings';
import { toastr } from 'react-redux-toastr';

class QuestionList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addQuestionModalIsOpen: false
    };
  }

  onToogleAddQuestionModal = () => {
    this.setState((state, props) => ({
      addQuestionModalIsOpen: !state.addQuestionModalIsOpen
    }));
  };

  componentWillMount() {
    this.props.fetchQuestions();
  }

  onDeleteChip = deletedChipQuestionId => {
    const { selectedIds } = this.props;

    this.props.onChangeSelect(
      filter(selectedIds, questionId => questionId !== deletedChipQuestionId)
    );
  };

  afterAddNewQuestion = () => {
    toastr.success('pytanie', 'pytanie dodano prawidłowo do testu');
  };

  render() {
    const { intl, onChangeSelect, selectedIds, questions, questionsIds } = this.props;

    const { addQuestionModalIsOpen } = this.state;

    const chips = reverse(
      selectedIds.map(questionId => {
        const question = questions[questionId];
        return {
          label: question.question,
          id: question.id
        };
      })
    );

    return (
      <div className="test-question-list">
        <ChipList
          className="selected-question-chips"
          onDeleteChip={this.onDeleteChip}
          chips={chips}
        />
        <Modal
          isOpen={addQuestionModalIsOpen}
          onRequestClose={this.onToogleAddQuestionModal}
          title="Add question"
        >
          <QuestionForm mode="simple" afterSuccessAdded={this.afterAddNewQuestion} />
        </Modal>
        <Button onClick={this.onToogleAddQuestionModal}>DODAJ PYTANIE</Button>
        <SimpleQuestionlist
          onChangeSelect={onChangeSelect}
          selectedIds={selectedIds}
          questions={questions}
          questionsIds={questionsIds}
        />
      </div>
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
  deleteQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionList));
