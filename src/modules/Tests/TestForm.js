import './tests.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, getFormValues, reduxForm, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required, minLength } from 'modules/_forms/validations';

import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';
import messages from './utils/messages';
import { injectIntl } from 'react-intl'
import globalMessages from 'utils/globalMessages';
import QuestionList from './smarts/QuestionList';
import Typography from 'libs/ui/Typography';

import { addTest } from 'modules/Tests/utils/actions';
import ChipList from 'libs/ui/ChipList/ChipList';
import MainLayout from 'modules/MainLayout/MainLayout';
import icons from 'consts/icons';
import paths from 'consts/paths';  // ES6

import intlWrapValidation from 'modules/_forms/intlWrapValidation';

const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD',
};

const quizNameMinLength = minLength(5);

class TestForm extends Component {
  static modes = MODES;

  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD,
  };

  constructor(props) {
    super(props);

    this.submit = props.handleSubmit(this.onSubmit);
    this.validations = {
      testName: intlWrapValidation(props.intl, [required, quizNameMinLength]),
    };

    this.appBarButtons = {
      left: {
        onClick: this.onClickGoBack,
        icon: icons.ARROW_BACK,
      },
      right: {
        onClick: props.handleSubmit(this.submit),
        icon: icons.DONE,
      }

    };
  }

  onSubmit = (values) => {
    this.props.submit(values, this.onClickGoBack);
  };

  renderQuestionsList = ({
     input: { value, onChange },
     meta: { touched, error, warning },
     selectedIds,
     label
    }) => {
    return (
      <div>
        <Typography variant="display1">{label}</Typography>
        <QuestionList
          selectedIds={value}
          onChangeSelect={onChange}
        />
      </div>

    );
  };

  onClickGoBack = () => {
    this.props.history.push(paths.TESTS);
  };

  render() {
    const {
      handleSubmit,
      intl,
      mode,
    } = this.props;

    const pageTitle = intl.formatMessage(mode === MODES.ADD ? messages.TEST_HEADER_ADD_MODE : messages.TEST_HEADER_EDIT_MODE);

    return (
      <MainLayout
        appBarTittle={pageTitle}
        appBarButtons={this.appBarButtons}
      >
        <Card
          className="tests-form"
          actions={(
            <Button
              type="submit"
            >{intl.formatMessage(globalMessages.SAVE)}</Button>
          )}
        >
          <form className="test-form" onSubmit={handleSubmit(this.submit)}>
            <InputField
              name='name'
              label={intl.formatMessage(messages.TEST_NAME)}
              validate={this.validations.testName}
              autoFocus
            />
            <InputField
              name='description'
              label={intl.formatMessage(messages.TEST_DESCRIPTION)}
            />
            <Field
              name='questionsIds'
              component={this.renderQuestionsList}
              label={intl.formatMessage(messages.TEST_QUESTIONS)}
            />

          </form>
        </Card>
      </MainLayout>
    );
  }


}

const FORM_NAME = 'TestForm';

TestForm = reduxForm({
  form: FORM_NAME,
  initialValues: {
    name: '',
    description: '',
    questionsIds: [],
  },
})(TestForm);

const mapStateToProps = (state, ownProps) => {
  return {};
};

const mapDispatchToProps = {
  onSubmit: addTest
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(TestForm));
