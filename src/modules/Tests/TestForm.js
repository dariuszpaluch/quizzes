import './tests.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, getFormValues, reduxForm, getFormSyncErrors } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required, minLength } from 'utils/validations';

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
import icons from 'consts/icons';  // ES6

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

    this.customAppBarButton = {
      onClick: this.onClickGoBack,
      icon: icons.ARROW_BACK,
    };
  }

  onSubmit = (values) => {
    this.props.onSubmit(values);
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
    this.props.history.push('/tests');
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
        customAppBarButton={this.customAppBarButton}
      >
        <Card
          className="tests-form"
        >
          <form className="test-form" onSubmit={handleSubmit(this.onSubmit)}>
            <InputField
              name='name'
              label={intl.formatMessage(messages.TEST_INPUT_NAME)}
              validate={[required, quizNameMinLength]}
            />
            <InputField
              name='description'
              label={intl.formatMessage(messages.TEST_INPUT_DESCRIPTION)}
            />
            <Field
              name='questionsIds'
              component={this.renderQuestionsList}
              label={intl.formatMessage(messages.TEST_INPUT_QUESTIONS)}
            />
            <Button
              type="submit"
            >{intl.formatMessage(globalMessages.SAVE)}</Button>
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
