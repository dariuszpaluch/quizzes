import './question_form.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FieldArray, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';
import pick from 'lodash/pick';
import map from 'lodash/map';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import ListFields from 'libs/reduxFormFields/ListFields/ListFields';
import { minLength, required } from 'modules/_forms/validations';

import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';
import { addQuestion } from './utils/actions';
import globalMessages from 'utils/globalMessages';
import { injectIntl } from 'react-intl';
import messages from 'modules/Question/utils/messages';
import MainLayout from 'modules/MainLayout/MainLayout';
import icons from 'consts/icons';
import paths from 'consts/paths';

import { MainLayoutContextWrapper } from 'modules/MainLayout/MainLayoutContext';

import { setAppBarButtons } from 'modules/MainLayout/utils/actions';
import classnames from 'classnames';
import intlWrapValidation from 'modules/_forms/intlWrapValidation';
import { arrayMinSize } from 'modules/_forms/validations';
import { withRouter } from 'react-router-dom';

export const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD'
};

class QuestionForm extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD
  };

  constructor(props) {
    super(props);

    this.onSubmit = props.handleSubmit(this.submit);

    this.validations = {
      question: intlWrapValidation(props.intl, [required, minLength(5)]),
      answersValidation: intlWrapValidation(props.intl, arrayMinSize(2, item => item.label))
    };

    this.appBarButtons = {
      left: {
        onClick: this.goBack,
        icon: icons.ARROW_BACK
      },
      right: {
        onClick: this.onSubmit,
        icon: icons.DONE,
        loading: props.submitting
      }
    };
  }

  componentDidMount() {
    this.updateAppBar();
  }

  componentWillUnmount() {
    const { mainLayoutContext } = this.props;
    if (!!mainLayoutContext) {
      const { restoreDefaultAppBar } = mainLayoutContext;

      restoreDefaultAppBar();
    }
  }

  updateAppBar() {
    const { intl, mainLayoutContext, mode } = this.props;

    if (mode !== 'simple' && !!mainLayoutContext) {
      const { setTitle, setAppBarActions } = mainLayoutContext;

      setTitle(intl.formatMessage(messages.QUESTION_LIST_HEADER));
      setAppBarActions(this.appBarButtons);
    }
  }

  goBack = () => {
    if (this.props.mode !== 'simple') this.props.history.push(paths.QUESTIONS);
  };

  submit = ({ question, description, answers }) => {
    const _answers = answers.map(answer => {
      return {
        label: answer.label,
        correct: answer.select
      };
    });

    return this.props.onSave({ question, description, answers: _answers });
  };

  renderActions() {
    const { intl, submitting } = this.props;
    return (
      <Button type="submit" color="primary" loading={submitting}>
        {intl.formatMessage(globalMessages.SAVE)}
      </Button>
    );
  }

  render() {
    const { handleSubmit, submitting, intl } = this.props;

    return (
      <form className="question-form" onSubmit={this.onSubmit}>
        <div className="row">
          <div className="col-xs-12">
            <InputField
              className="col-xs-12"
              name="question"
              label={intl.formatMessage(messages.QUESTION_INPUT_LABEL)}
              autoFocus
              validate={this.validations.question}
            />
          </div>
          <div className="col-xs-12">
            <InputField
              className="col-xs-12"
              name="description"
              label={intl.formatMessage(messages.QUESTION_DESCRIPTION_INPUT_LABEL)}
            />
          </div>
          <div className="col-xs-12">
            <FieldArray
              name="answers"
              component={ListFields}
              className={classnames('answer-list', 'col-xs-12')}
              inputPlaceholder="Answer"
              addButtonLabel={intl.formatMessage(messages.ADD_ANSWER)}
              validate={this.validations.answersValidation}
            />
          </div>
        </div>
        <div className="col-xs-12">{this.renderActions()}</div>
      </form>
    );
  }
}

const FORM_NAME = 'QuestionForm';

QuestionForm = reduxForm({
  form: FORM_NAME
})(QuestionForm);

const INIT_DATA = {
  question: '',
  answers: [{ label: '' }]
};

const mapStateToProps = (state, ownProps) => {
  const data = ownProps.question && {
    ...pick(ownProps.question, ['question', 'description', 'answers'])
  };

  if (data)
    data.answers = map(data.answers, answer => ({
      ...answer,
      select: answer.correct
    }));

  return {
    initialValues: data || INIT_DATA
  };
};

const mapDispatchToProps = {
  resetForm: reset.bind(null, FORM_NAME)
};

QuestionForm = withRouter(connect(mapStateToProps, mapDispatchToProps)(injectIntl(QuestionForm)));

export default MainLayoutContextWrapper(QuestionForm);
