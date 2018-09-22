import './language_switch.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getActiveLanguage, getAvailableLanguages } from 'modules/Intl/reducer';
import Select from 'libs/ui/Select/Select';
import { injectIntl } from 'react-intl';

import intlMessages from './messages';
import { onChangeQuestionRate } from 'modules/Intl/actions';

class LanguageSwitch extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};

    const { intl } = props;

    this.options = [
      {
        value: 'en',
        label: intl.formatMessage(intlMessages.ENGLISH_LANGUAGE)
      },
      {
        value: 'pl',
        label: intl.formatMessage(intlMessages.POLISH_LANGUAGE)
      }
    ];
  }

  onChange = selectedLanguage => {
    if (selectedLanguage !== this.props.activeLanguage) {
      this.props.onChangeQuestionRate(selectedLanguage);
    }
  };

  render() {
    const { activeLanguage } = this.props;

    return (
      <div className="language-switch">
        <Select
          className="language-select"
          onChange={this.onChange}
          value={activeLanguage}
          options={this.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    availableLanguages: getAvailableLanguages(state),
    activeLanguage: getActiveLanguage(state)
  };
};

const mapDispatchToProps = {
  onChangeQuestionRate
};

export default compose(connect(mapStateToProps, mapDispatchToProps), injectIntl)(LanguageSwitch);
