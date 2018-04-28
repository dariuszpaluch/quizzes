import './question_form.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Typography from 'libs/ui/Typography/Typography';
import List from 'libs/ui/List/List';
import normalizeList from 'utils/normalizeList';
import StarRating from 'libs/ui/StarRating/StarRating';

export default class QuestionForm extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array
  };

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  renderAnswers(answers) {
    const _answers = normalizeList(answers);

    return (
      <div className="answers-options">
        <List
          selectedRowsIds={this.props.value}
          rowsIds={_answers.allIds}
          rows={_answers.byId}
          onChangeSelect={this.props.onChange}
          selectOnClick
          selectedClass="answer-selected"
        />
      </div>
    );
  }

  render() {
    const { className, question, onChangeQuestionRate, rating } = this.props;

    const classes = classnames('question-form', className);

    const { description, hints, answers } = question;

    return (
      <div className={classes}>
        <div className="question-description">
          <Typography variant="headline" className="question">
            {question.question}
          </Typography>
          <Typography variant="caption" className="description">
            {description}
          </Typography>
          <StarRating rating={rating} onChange={onChangeQuestionRate} />
        </div>
        {this.renderAnswers(question.answers)}
      </div>
    );
  }
}
