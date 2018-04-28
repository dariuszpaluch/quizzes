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

const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD'
};

class QuestionForm extends Component {
  static MODES = MODES;

  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD
  };

  constructor(props) {
    super(props);

    this.onSubmit = props.handleSubmit(this.submit);

    this.appBarButtons = {
      left: {
        onClick: this.goBack,
        icon: icons.ARROW_BACK
      },
      right: {
        onClick: this.onSubmit,
        icon: icons.DONE
      }
    };
  }

  componentDidMount() {
    const { intl, mainLayoutContext } = this.props;
    if (!!mainLayoutContext) {
      const { setTitle, setAppBarActions } = mainLayoutContext;

      setTitle(intl.formatMessage(messages.QUESTION_LIST_HEADER));
      setAppBarActions(this.appBarButtons);
    }
  }

  componentWillUnmount() {
    const { mainLayoutContext } = this.props;
    if (!!mainLayoutContext) {
      const { restoreDefaultAppBar } = mainLayoutContext;

      restoreDefaultAppBar();
    }
  }

  goBack = () => {
    this.props.history.push(paths.QUESTIONS);
  };

  submit = ({ question, description, answers }) => {
    const _answers = answers.map(answer => {
      return {
        label: answer.label,
        correct: answer.select
      };
    });

    return this.props
      .saveQuestion({ question, description, answers: _answers })
      .then(this.goBack);
  };

  renderActions() {
    const { intl, submitting } = this.props;
    return (
      <Button type="submit" color="primary" loader={submitting}>
        {intl.formatMessage(globalMessages.SAVE)}
      </Button>
    );
  }

  render() {
    const { handleSubmit, submitting, intl } = this.props;

    return (
      <Card className="question-form">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="col-xs-12">
              <InputField
                className="col-xs-12"
                name="question"
                label={STRINGS.INPUTS.QUESTION}
                autoFocus
              />
            </div>
            <div className="col-xs-12">
              <InputField
                className="col-xs-12"
                name="description"
                label={STRINGS.INPUTS.DESCRIPTION}
              />
            </div>
            <div className="col-xs-12">
              <FieldArray
                name="answers"
                component={ListFields}
                className={classnames('answer-list', 'col-xs-12')}
                inputPlaceholder="Answer"
                addButtonLabel={intl.formatMessage(messages.ADD_ANSWER)}
              />
            </div>
          </div>
          <div className="col-xs-12">{this.renderActions()}</div>
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
    answers: [
      {
        correct: false,
        label: ''
      }
    ]
  }
})(QuestionForm);

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: pick(ownProps.question, [
      'question',
      'description',
      'answers'
    ]) || { answers: [{ label: '' }] }
  };
};

const mapDispatchToProps = {
  saveQuestion: addQuestion
};

QuestionForm = connect(mapStateToProps, mapDispatchToProps)(
  injectIntl(QuestionForm)
);

export default MainLayoutContextWrapper(QuestionForm);
