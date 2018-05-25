import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';

import en from 'react-intl/locale-data/en';
import pl from 'react-intl/locale-data/pl';

class Intl extends Component {
  render() {
    const { children, locale, messages } = this.props;

    const _locale = locale === 'dev' ? 'pl' : locale;

    return (
      <IntlProvider
        locale={_locale}
        defaultLocale="pl"
        messages={messages}
      >
        {children}
      </IntlProvider>
    );
  }
}

function mapStateToProps(state) {
  const { activeLanguage, messages } = state.intl;

  return {
    locale: activeLanguage || 'pl',
    messages: messages[activeLanguage] || {}
  };
}

export default connect(mapStateToProps, null)(Intl);
