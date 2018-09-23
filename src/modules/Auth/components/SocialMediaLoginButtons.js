import './social_media_login_buttons.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import Button from 'libs/ui/Button/Button';
import { API_URL } from 'settings';
import { injectIntl } from 'react-intl';
import authMessages from 'modules/Auth/utils/messages';

class SocialMediaLoginButtons extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.returnUrl = window.document.location.href + location.search;
  }

  render() {
    const { intl } = this.props;

    return (
      <div className="social-media-buttons">
        <a
          key="facebook"
          href={`${API_URL}/auth/facebook?returnUrl=${encodeURIComponent(this.returnUrl)}`}
        >
          <Button className="social-login login-facebook">{intl.formatMessage(authMessages.LOGIN_WITH_FACEBOOK)}</Button>
        </a>
        <a
          key="google"
          href={`${API_URL}/auth/google?returnUrl=${encodeURIComponent(this.returnUrl)}`}
        >
          <Button className="social-login login-google">{intl.formatMessage(authMessages.LOGIN_WITH_GOOGLE)}</Button>
        </a>
        {/*<a*/}
          {/*key="github"*/}
          {/*href={`${API_URL}/auth/github?returnUrl=${encodeURIComponent(this.returnUrl)}`}*/}
        {/*>*/}
          {/*<Button className="social-login login-github">Login with Github</Button>*/}
        {/*</a>*/}
      </div>
    );
  }
}

export default injectIntl(SocialMediaLoginButtons);
