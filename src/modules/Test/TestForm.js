import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';
import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required } from 'utils/validations';

import STRINGS from './strings';
import Button from 'libs/ui/Button/Button';
import Card from 'libs/ui/Card/Card';

const MODES = {
  EDIT: 'EDIT',
  ADD: 'ADD',
};

class TestForm extends Component {
  static MODES = MODES;

  static propTypes = {
    mode: PropTypes.oneOf(values(MODES))
  };

  static defaultProps = {
    mode: MODES.ADD,
  };

  render() {
    const {
      onSubmit,
      handleSubmit,
      mode,
    } = this.props;


    i
    return (
      <Card
        title={STRINGS.HEADER[mode]}
      >
        <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name='question'
            label={STRINGS.INPUTS.QUESTION}
            validate={[required]}
          />
          <InputField
            name='description'
            label={STRINGS.INPUTS.DESCRIPTION}
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

const FORM_NAME = 'TestForm';

TestForm = reduxForm({
  form: FORM_NAME,
})(TestForm);

const mapDispatchToProps = {
  onSubmit: () => {
  } //TODO implement onSubmit
};

export default connect(null, mapDispatchToProps)(TestForm);
