import './make_test_form.scss';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';

import size from 'lodash/size';

import Stepper from 'libs/ui/Stepper/Stepper';
import Card from 'libs/ui/Card/Card';
import globalMessages from 'utils/globalMessages';
import { injectIntl } from 'react-intl';
import QuestionForm from 'modules/MakeTest/components/QuestionForm/QuestionForm';
import { setQuestionAnswer } from 'modules/MakeTest/utils/actions';
import { Paper } from 'material-ui';
import messages from 'modules/MakeTest/utils/messages';
import ReactSwipe from 'react-swipe';
import Carousel from 'nuka-carousel';

const ANIMATION_DURATION = 0;

class MakeTestForm extends Component {
  static propTypes = {
    questionsIds: PropTypes.array,
    questions: PropTypes.object,
    testName: PropTypes.string,
  };

  static defaultProps = {
    testName: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
    };
  }

  changeStep(activeStep) {
    if(activeStep !== this.state.activeStep) {
      this.setState({
        activeStep
      }, () => {
        if (this.swipeList) {
          this.swipeList.slide(activeStep, ANIMATION_DURATION);
        }
      });
    }
  }

  onGoNext = () => {
    const newActiveStep = this.state.activeStep + 1;
    if (newActiveStep < size(this.props.questionsIds)) {
      this.changeStep(newActiveStep);
    }
  };

  onGoPrev = () => {
    const newActiveStep = this.state.activeStep - 1;
    if (newActiveStep >= 0) {
      this.changeStep(newActiveStep);
    }
  };

  getActiveQuestionId() {
    return this.props.questionsIds[this.state.activeStep];
  }

  onChangeQuestionAnswer = (answer) => {
    const questionId = this.getActiveQuestionId();

    this.props.onChangeQuestionAnswer(questionId, answer);
  };

  onTransitionEnd = (index) => {
    const { values, questionsIds } = this.props;

    if(index > this.state.activeStep && !size(values[questionsIds[index - 1]]) ) {
      this.swipeList.prev();
    }
    else {
      this.changeStep(index);
    }
  };

  renderQuestion() {
    const { questions, values, questionsIds } = this.props;

    const questionsForms = [];

    return questionsIds.map((questionId, index) => {
      const question = questions[questionId];

      return (
        <QuestionForm
          key={index}
          question={question}
          onChange={this.onChangeQuestionAnswer}
          value={values[questionId]}
        />
      );
    });
  }

  render() {
    const { intl, testName, questionsIds, values } = this.props;
    const { activeStep } = this.state;

    const questionId = this.getActiveQuestionId();

    const questionIsValid = !!size(values[questionId]);

    const numberOfSteps = size(questionsIds);
    return (
      <Card
        className="make-test-form"
      >
        <ReactSwipe
          key="mobile-streams-list"
          className="mobile-streams-list"
          swipeOptions={{
            continuous: false,
            transitionEnd: this.onTransitionEnd,
          }}
          ref={(el) => {
            this.swipeList = el;
          }}
        >
          {this.renderQuestion()}
        </ReactSwipe>

        <Paper className="test-stepper-wrapper">
          <Stepper
            className="test-stepper"
            activeStep={activeStep}
            steps={numberOfSteps}
            onNext={this.onGoNext}
            onPrev={this.onGoPrev}
            disabledNext={activeStep > numberOfSteps - 1 || !questionIsValid}
            disabledPrev={!activeStep}
            nextLabel={intl.formatMessage(globalMessages.NEXT)}
            prevLabel={intl.formatMessage(globalMessages.PREV)}
            stepLabel={intl.formatMessage(messages.QUESTION_STEPPER_LABEL, {
              step: activeStep + 1,
              numberOfQuestions: numberOfSteps,
            })}
          />
        </Paper>
      </Card>

    );
  }
}

export default injectIntl(MakeTestForm);