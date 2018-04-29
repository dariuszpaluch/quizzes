import './question_list.scss';

import React, { Component } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import forEach from 'lodash/forEach';

import List from 'libs/ui/List/List';
import Card from 'libs/ui/Card/Card';
import Typography from 'libs/ui/Typography/Typography';
import messages from 'modules/Question/utils/messages';
import { injectIntl } from 'react-intl';
import IconButton from 'libs/ui/IconButton/IconButton';
import parsePath from 'utils/parsePath';
import { questionPaths } from 'consts/paths';
import icons from 'consts/icons';
import Button from 'libs/ui/Button/Button';
import globalMessages from 'utils/globalMessages';
import Icon from 'libs/ui/Icon/Icon';
import stringInclude from 'utils/stringInclude';

import filter from 'lodash/filter';

class SimpleQuestionlist extends Component {
  static propTypes = {
    className: PropTypes.string,
    questionsIds: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    ),
    questions: PropTypes.objectOf(PropTypes.object),
    selectedIds: PropTypes.arrayOf(PropTypes.string),
    onChangeSelect: PropTypes.func,
    filterQuery: PropTypes.string
  };

  static defaultProps = {
    className: '',
    questionsIds: [],
    questions: {},
    onChangeSelect: null,
    selectedIds: [],
    filterQuery: ''
  };

  constructor(props) {
    super(props);

    this.state = {
      openQuestions: {}
    };
  }

  onToggleQuestionCollapse = questionId => {
    this.setState({
      openQuestions: {
        ...this.state.openQuestions,
        [questionId]: !this.state.openQuestions[questionId]
      }
    });
  };

  onChangeSelect = (questionId, checked) => {
    const newValue = checked
      ? [...this.props.selectedIds, questionId]
      : filter(
          this.props.selectedIds,
          _questionId => _questionId !== questionId
        );

    this.props.onChangeSelect(newValue);
  };

  prepareQuestionsRows(questions) {
    const rows = {};
    forEach(questions, (question, questionId) => {
      rows[questionId] = {
        ...question,
        label: question.question,
        children: this.renderQuestionDetails(question, questionId)
      };
    });

    return rows;
  }

  renderQuestionDetails({ description, answers, hints }, questionId) {
    const { intl, onEdit, onDelete } = this.props;

    return (
      <div className="question-details">
        <Typography variant="subheading">
          Opis: {description || intl.formatMessage(messages.NO_DESCRIPTION)}
        </Typography>
        <Typography variant="subheading">
          {intl.formatMessage(messages.ANSWERS)}:
        </Typography>
        <ul className="answers">
          {answers &&
            answers.map(({ correct, label }, index) => (
              <li key={index} className={classnames({ correct })}>
                {label}
              </li>
            ))}
        </ul>
        {onEdit || onDelete
          ? this.renderQuestionActions(questionId, onEdit, onDelete)
          : null}
      </div>
    );
  }

  renderQuestionActions(questionId, onEdit, onDelete) {
    const { intl } = this.props;

    return (
      <div className="question-actions">
        {onEdit && (
          <Button color="primary" onClick={onEdit.bind(null, questionId)}>
            <Icon icon={icons.EDIT} />
            {intl.formatMessage(globalMessages.EDIT)}
          </Button>
        )}
        {onDelete && (
          <Button color="secondary" onClick={onDelete.bind(null, questionId)}>
            <Icon icon={icons.DELETE} />
            {intl.formatMessage(globalMessages.DELETE)}
          </Button>
        )}
      </div>
    );
  }

  render() {
    const { questionsIds, questions, selectedIds, filterQuery } = this.props;

    let _questionsIds = questionsIds;
    if (filterQuery)
      _questionsIds = filter(questionsIds, questionId =>
        stringInclude(questions[questionId].question, filterQuery)
      );

    return (
      <List
        className="question-list"
        rowsIds={_questionsIds}
        rows={this.prepareQuestionsRows(questions)}
        selectedRowsIds={selectedIds}
        onChangeSelect={this.props.onChangeSelect}
      />
    );
  }
}

export default injectIntl(SimpleQuestionlist);
