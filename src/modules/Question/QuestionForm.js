import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';
import pick from 'lodash/pick';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required } from 'modules/_forms/validations';

import STRINGS from './utils/strings';
import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';
import AnswersForm from './components/AnswersForm'
import {addQuestion} from "./utils/actions";

const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD',
};

class QuestionForm extends Component {
  static MODES = MODES;

  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD,
  };

  onSubmit = ({question, description, answers}) => {
    return this.props.onSubmit({question, description, answers});
  };

  render() {
    const {
      onSubmit,
      handleSubmit,
      mode,
      pristine,
      reset,
      submitting
    } = this.props;

    return (
      <Card title={STRINGS.HEADER[mode]}>
        <form className="sign-in-form" onSubmit={handleSubmit(this.onSubmit)}>
          <InputField
            name='question'
            label={STRINGS.INPUTS.QUESTION}
          />
          <InputField
            name='description'
            label={STRINGS.INPUTS.DESCRIPTION}
          />
          <AnswersForm
            name="answers"
          />
          <Button
            type="submit"
          >Submit
          </Button>
        </form>
      </Card>
    );
  }


}

const FORM_NAME = 'QuestionForm';

QuestionForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    question: '',
    answers: [{
      correct:false,
      label: '',
    }]
  },
})(QuestionForm);

const mapStateToProps = (state, ownProps ) => {
  return {
    initialValues: pick(ownProps.question, ['question', 'description', 'answers']) || { answers: ['']},
  };
};

const mapDispatchToProps = {
  onSubmit: addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm);
