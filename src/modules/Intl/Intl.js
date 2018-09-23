import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addLocaleData, IntlProvider } from 'react-intl';
import { getActiveLanguage, getMessages } from 'modules/Intl/reducer';

class Intl extends Component {
  render() {
    const { children, locale, messages } = this.props;

    return (
      <IntlProvider
        locale={locale}
        defaultLocale="en"
        messages={messages}
        key={locale}
        textComponent={React.Fragment}
      >
        {children}
      </IntlProvider>
    );
  }
}

const mapStateToProps = state => ({
  locale: getActiveLanguage(state),
  messages: getMessages(state)
});

export default connect(mapStateToProps, null)(Intl);
