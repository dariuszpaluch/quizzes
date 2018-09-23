import './question_form.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Typography from 'libs/ui/Typography/Typography';
import List from 'libs/ui/List/List';
import normalizeList from 'utils/normalizeList';
import StarRating from 'libs/ui/StarRating/StarRating';
import { injectIntl } from 'react-intl';
import messages from 'modules/MakeTest/utils/messages';
import IconButton from 'libs/ui/IconButton/IconButton';
import icons from 'consts/icons';
import Button from 'libs/ui/Button/Button';
import Icon from 'libs/ui/Icon/Icon';

class QuestionForm extends Component {
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
          selectOnAllContent
        />
      </div>
    );
  }

  render() {
    const { className, question, onChangeQuestionRate, rating, intl } = this.props;

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

          <div className="actions">
            {/*<Button>*/}
              {/*<Icon size={25} icon={icons.SAVE} />*/}
              {/*Zapisz pytanie*/}
            {/*</Button>*/}
          </div>

          <div className="question-rating">
            <label>{intl.formatMessage(messages.MAKE_TEST_QUESTION_RATE)}</label>
            <StarRating rating={rating} onChange={onChangeQuestionRate} />
          </div>
        </div>
        {this.renderAnswers(question.answers)}
      </div>
    );
  }
}

export default injectIntl(QuestionForm);
