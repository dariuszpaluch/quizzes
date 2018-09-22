import './card.scss';

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import  { Card as MaterialCard, CardActions, CardContent, CardHeader } from '@material-ui/core';
import IconButton from 'libs/ui/IconButton/IconButton';

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.any,
    subheader: PropTypes.any,
    className: PropTypes.string,
    headerAction: PropTypes.shape({
      icon: PropTypes.string,
      onClick: PropTypes.func
    }),
    centerHeader: PropTypes.bool,
    actions: PropTypes.any,
    contentClass: PropTypes.string,
    actionsClass: PropTypes.string,
    headerClass: PropTypes.string,
    noSpace: PropTypes.bool
  };

  static defaultProps = {
    title: '',
    subheader: '',
    className: '',
    centerHeader: false,
    actions: null,
    contentClass: '',
    actionsClass: '',
    headerClass: ''
  };

  renderHeaderAction() {
    const { headerAction } = this.props;

    if (!headerAction) return null;

    return <IconButton icon={headerAction.icon} onClick={headerAction.onClick} />;
  }

  renderHeader() {
    const { title, subheader, headerClass } = this.props;

    if (!title && !subheader) {
      return null;
    }

    return (
      <CardHeader
        className={classnames('card-header', headerClass)}
        title={title}
        subheader={subheader}
        action={this.renderHeaderAction()}
      />
    );
  }

  render() {
    const {
      className,
      children,
      actions,
      headerAction,
      centerHeader,
      title,
      subheader,
      contentClass,
      actionsClass,
      headerClass,
      noSpace,
      ...props
    } = this.props;

    const classes = classnames(className, 'card', {
      'center-header': centerHeader,
      'with-header': title || subheader,
      'no-content-space': noSpace
    });

    return (
      <MaterialCard className={classes} {...props}>
        {this.renderHeader()}
        <CardContent className={classnames('card-content', contentClass)}>{children}</CardContent>
        {!!actions ? (
          <CardActions className={classnames('card-actions', actionsClass)}>{actions}</CardActions>
        ) : null}
      </MaterialCard>
    );
  }
}
