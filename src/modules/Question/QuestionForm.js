import './question_form.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FieldArray, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';
import pick from 'lodash/pick';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import ListFields from 'libs/reduxFormFields/ListFields/ListFields';
import { required } from 'modules/_forms/validations';

import STRINGS from './utils/strings';
import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';
import {addQuestion} from "./utils/actions";
import globalMessages from 'utils/globalMessages';
import { injectIntl } from 'react-intl';
import messages from 'modules/Question/utils/messages';
import MainLayout from 'modules/MainLayout/MainLayout';
import icons from 'consts/icons';
import paths from 'consts/paths';

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

  constructor(props) {
    super(props);

    this.appBarButtons = {
      left: {
        onClick: this.goBack,
        icon: icons.ARROW_BACK,
      },
      right: {
        onClick: props.handleSubmit(this.submit),
        icon: icons.DONE,
      }
    };
  }

  goBack = () => {
    this.props.history.push(paths.QUESTIONS);
  };

  submit = ({question, description, answers}) => {
    const _answers = answers.map(answer => {
      return {
        label: answer.label,
        correct: answer.select,
      }
    });

    return this.props.onSubmit({question, description, answers: _answers}).then(this.goBack);
  };

  render() {
    const {
      handleSubmit,
      mode,
      pristine,
      reset,
      submitting,
      intl,
    } = this.props;

    return (
      <MainLayout
        appBarTittle={intl.formatMessage(messages.QUESTION_LIST_HEADER)}
        appBarButtons={this.appBarButtons}
      >
        <Card title={STRINGS.HEADER[mode]}>
          <form className="question-form" onSubmit={handleSubmit(this.submit)}>
            <InputField
              name='question'
              label={STRINGS.INPUTS.QUESTION}
            />
            <InputField
              name='description'
              label={STRINGS.INPUTS.DESCRIPTION}
            />
            <FieldArray
              name="answers"
              component={ListFields}
              className="answer-list"
              inputPlaceholder="Answer"
              addButtonLabel={intl.formatMessage(messages.ADD_ANSWER)}
            />
            <Button
              type="submit"
              color="primary"
            >{intl.formatMessage(globalMessages.SAVE)}</Button>
          </form>
        </Card>
      </MainLayout>
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
    initialValues: pick(ownProps.question, ['question', 'description', 'answers']) || { answers: [{label: ''}]},
  };
};

const mapDispatchToProps = {
  onSubmit: addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionForm));
