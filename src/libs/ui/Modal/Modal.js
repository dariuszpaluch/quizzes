import './custom_modal.scss';

import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';

import ReactModal from 'react-modal';
import Typography from 'libs/ui/Typography/Typography';
import Card from 'libs/ui/Card/Card';
import IconButton from 'libs/ui/IconButton/IconButton';
import icons from 'consts/icons';

ReactModal.setAppElement('#app');

export default class Modal extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    isOpen: PropTypes.bool,
    onRequestClose: PropTypes.func
  };

  static defaultProps = {
    className: '',
    isOpen: false,
    onRequestClose: null
  };

  render() {
    const { className, isOpen, onRequestClose, title } = this.props;

    const style = {
      overlay: {
        backgroundColor: 'rgba(82, 82, 82, 0.32)',
        zIndex: 1000
      }
    };

    const classNames = classnames('modal', className);

    return (
      <ReactModal
        style={style}
        overlayClassName="modal-overlay"
        className={classNames}
        isOpen={isOpen}
        contentLabel=""
        onRequestClose={onRequestClose}
        zIndex={1000}
      >
        {!!onRequestClose ? (
          <IconButton
            icon={icons.CLOSE}
            className="modal-close-button"
            onClick={onRequestClose}
            iconSize={30}
          />
        ) : null}
        <Card className="modal-body">
          {title ? <Typography variant="title">{title}</Typography> : null}
          {this.props.children}
        </Card>
      </ReactModal>
    );
  }
}
