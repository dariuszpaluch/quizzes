import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import values from 'lodash/values';
import pick from 'lodash/pick';

import InputField from 'libs/reduxFormFields/InputField/InputField';
import { required } from 'utils/validations';

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

  onSubmit = () => {

  }

  render() {
    const {
      handleSubmit,
    } = this.props;

    return (
      <Card>
        <form className="sign-in-form" onSubmit={handleSubmit(this.onSubmit)}>
          <InputField
            name='name'
            label={'name'}
            validate={[required]}
          />
          <InputField
            name='description'
            label={'description'}
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
  initialValues: {
    name: '',
    description: '',
  },
})(TestForm);

const mapStateToProps = (state, ownProps ) => {
  return {
  };
};

const mapDispatchToProps = {
  // onSubmit: addQuestion
};

export default connect(mapStateToProps, mapDispatchToProps)(TestForm);
