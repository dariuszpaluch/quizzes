import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {withRouter} from "react-router-dom";
import {fetchQuestion} from "modules/Test/actions";
import TestForm from "modules/Test/TestForm";

class EditTest extends Component {
  componentWillMount() {
    this.props.fetchQuestion(this.props.match.params.questionId);
  }

  render() {
    return (
      <TestForm
        mode={TestForm.MODES.EDIT}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
};

const mapDispatchToProps = {
  fetchQuestion
};

export default connect(null, mapDispatchToProps)(withRouter(EditTest));