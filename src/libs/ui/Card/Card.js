import './card.scss';

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import MaterialCard, {CardActions, CardContent, CardHeader} from 'material-ui/Card';
import IconButton from 'libs/ui/IconButton/IconButton';

export default class Card extends Component {
  static propTypes = {
    title: PropTypes.string,
    subheader: PropTypes.string,
    className: PropTypes.string,
    headerAction: PropTypes.shape({
      icon: PropTypes.string,
      onClick: PropTypes.func,
    })
  };

  static defaultProps = {
    title: '',
    subheader: '',
    className: '',
  };

  renderHeaderAction() {
    const {
      headerAction,
    } = this.props;

    if(!headerAction)
      return null;

    return <IconButton icon={headerAction.icon} onClick={headerAction.onClick}/>
  }

  renderHeader() {
    const {
      title,
      subheader,
    } = this.props;

    if(!title && !subheader) {
      return null
    }

    return (
      <CardHeader
        className="card-header"
        title={ title }
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
      ...props,
    } = this.props;

    const classes = classnames(className, 'card');

    return (
      <MaterialCard
        className={classes}
        {...props}
      >
        {this.renderHeader()}
        <CardContent className="card-content">
          {children}
        </CardContent>
        {!!actions ? <CardActions>{actions}</CardActions> : null}
      </MaterialCard>
    );
  }
}