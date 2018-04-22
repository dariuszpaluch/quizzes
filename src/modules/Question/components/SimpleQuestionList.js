import React, {Component} from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import forEach from 'lodash/forEach';

import filter from "lodash/filter";

import List from 'libs/ui/List/List';

class SimpleQuestionlist extends Component {
  static propTypes = {
    className: PropTypes.string,
    questionsIds: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.number, PropTypes.string
    ])),
    questions: PropTypes.objectOf(PropTypes.shape({
      question: PropTypes.string,
      description: PropTypes.string,
    })),
    selectedIds: PropTypes.arrayOf(PropTypes.string),
    onChangeSelect: PropTypes.func,
  };

  static defaultProps = {
    className: '',
    questionsIds: [],
    questions: {},
    onChangeSelect: null,
    selectedIds: [],
  };

  constructor(props) {
    super(props);

    this.state = {
      openQuestions: {}
    }
  }

  onToggleQuestionCollapse = (questionId) => {
    this.setState({
      openQuestions: {
        ...this.state.openQuestions,
        [questionId]: !this.state.openQuestions[questionId]
      }
    })
  };

  onChangeSelect = (questionId, checked) => {
    const newValue = checked ?
      [...this.props.selectedIds, questionId]
      : filter(this.props.selectedIds, _questionId => _questionId !== questionId);

    this.props.onChangeSelect(newValue);
  };

  prepareQuestionsRows(questions) {
    const rows = {};
    forEach(questions, (question, questionId) => {
      rows[questionId] = {
        ...question,
        label: question.question,
        children: <span>{question.description}</span>
      }
    });

    return rows;
  }

  render() {
    const {
      questionsIds,
      questions,
      selectedIds,
    } = this.props;

    return (
      <List
        rowsIds={questionsIds}
        rows={this.prepareQuestionsRows(questions)}
        selectedRowsIds={selectedIds}
        onChangeSelect={this.props.onChangeSelect}
      />
    );
  }
}

export default SimpleQuestionlist;
