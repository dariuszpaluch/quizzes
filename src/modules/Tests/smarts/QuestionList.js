import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addQuestion, fetchQuestions } from 'modules/Question/utils/actions';

import { deleteQuestion } from 'modules/Question/utils/actions';
import {
  getQuestionIsFetching,
  getQuestions,
  getQuestionsIds,
  getQuestionsLoading
} from 'modules/Question/utils/getters';
import { injectIntl } from 'react-intl';
import SimpleQuestionlist from 'modules/Question/components/SimpleQuestionList';
import ChipList from 'libs/ui/ChipList';
import filter from 'lodash/filter';
import reverse from 'lodash/reverse';
import QuestionForm from 'modules/Question/forms/QuestionForm';
import Modal from 'libs/ui/Modal/Modal';
import Button from 'libs/ui/Button/Button';
import { toastr } from 'react-redux-toastr';
import Loading from 'libs/ui/Loading/Loading';

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

  afterAddNewQuestion = data => {
    const { selectedIds } = this.props;
    toastr.success('pytanie', 'pytanie dodano prawidłowo do testu');
    this.props.onChangeSelect([...selectedIds, data.id]);
  };

  render() {
    const { intl, onChangeSelect, selectedIds, questions, questionsIds, loading } = this.props;

    if (loading) {
      return <Loading center />;
    }

    const { addQuestionModalIsOpen } = this.state;

    let chips = [];
    selectedIds.map(questionId => {
      const question = questions[questionId];
      if (question) {
        chips.push({
          label: question.question,
          id: question.id
        });
      }
    });

    chips = reverse(chips);

    return (
      <div className="test-question-list">
        <Modal
          isOpen={addQuestionModalIsOpen}
          onRequestClose={this.onToogleAddQuestionModal}
          title="Add question"
        >
          <QuestionForm
            mode="simple"
            afterSuccessAdded={this.afterAddNewQuestion}
            onSave={this.props.addQuestion}
          />
        </Modal>
        <ChipList
          className="selected-question-chips"
          onDeleteChip={this.onDeleteChip}
          chips={chips}
        />
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
    loading: getQuestionIsFetching(state)
  };
};

const mapDispatchToProps = {
  fetchQuestions,
  deleteQuestion,
  addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionList));
