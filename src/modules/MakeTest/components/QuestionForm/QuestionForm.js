import './question_form.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types'
import classnames from 'classnames';
import Card from 'libs/ui/Card/Card';
import Checkbox from 'libs/ui/Checkbox/Checkbox';
import Typography from 'libs/ui/Typography/Typography';
import List from 'libs/ui/List/List';
import normalizeList from 'utils/normalizeList';

export default class QuestionForm extends Component {
  static propTypes = {
    question: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.array,
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
        />
        {

          // answers.map((answer, index) => {
          //   return (
          //     <div
          //       key={answer.id || index}
          //       className="answer-option"
          //     >
          //       <Checkbox
          //         onChange={() => {
          //         }}/>
          //       <Typography variant="display1">{answer.label}</Typography>
          //     </div>
          //   );
          // })
        }
      </div>
    );
  }

  render() {
    const { className, question } = this.props;

    const classes = classnames('question-form', className);

    const { description, hints, answers } = question;

    return (
      <div
        className={classes}
      >
        <div>
          {question.question}
          {description}
        </div>
        {this.renderAnswers(question.answers)}
      </div>
    );
  }
}