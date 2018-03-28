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
    this.setState({
      activeStep
    })
  }

  onGoNext = () => {
    const newActiveStep = this.state.activeStep + 1;
    if(newActiveStep < size(this.props.questionsIds)) {
      this.changeStep(newActiveStep);
    }
  };

  onGoPrev = () => {
    const newActiveStep = this.state.activeStep - 1;
    if(newActiveStep >= 0) {
      this.changeStep(newActiveStep);
    }
  };

  getActiveQuestionId() {
    return this.props.questionsIds[this.state.activeStep];
  }

  onChangeQuestionAnswer = (answer) => {
    const questionId = this.getActiveQuestionId();

    this.props.onChangeQuestionAnswer(questionId, answer)
  };

  renderQuestion() {
    const { questions, values } = this.props;

    const questionId = this.getActiveQuestionId();
    return (
      <QuestionForm
        question={questions[questionId]}
        onChange={this.onChangeQuestionAnswer}
        value={values[questionId]}
      />
    );
  }
  renderStepperLabel() {

  }

  render() {
    const { intl, testName, questionsIds } = this.props;
    const { activeStep } = this.state;

    const numberOfSteps = size(questionsIds);
    return(
      <Card
        className="make-test-form"
        title={testName}
      >
        {this.renderQuestion()}
        <Paper className="test-stepper-wrapper">
          <Stepper
            className="test-stepper"
            activeStep={activeStep}
            steps={numberOfSteps}
            onNext={this.onGoNext}
            onPrev={this.onGoPrev}
            nextLabel={intl.formatMessage(globalMessages.NEXT)}
            prevLabel={intl.formatMessage(globalMessages.PREV)}
            stepLabel={intl.formatMessage(messages.QUESTION_STEPPER_LABEL, {step: activeStep + 1, numberOfQuestions: numberOfSteps})}
          />
        </Paper>
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = {
  onChangeQuestionAnswer: setQuestionAnswer,
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(MakeTestForm));