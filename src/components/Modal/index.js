import React, { Component } from 'react';
import { withStyles, Modal } from '@material-ui/core';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Clear';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import styles from './styles';
import * as modalAction from '../../actions/modal';

class CommonModal extends Component {
  render() {
    const { classes, open, title, component, modalActionCreators } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <Modal open={open} onClose={hideModal}>
        <div className={classes.modal}>
          <div className={classes.header}>
            <span className={classes.title}>{title}</span>
            <CloseIcon className={classes.icon} onClick={hideModal} />
          </div>
          <div className={classes.content}>{component}</div>
        </div>
      </Modal>
    );
  }
}

CommonModal.propTypes = {
  classes: PropTypes.object,
  open: PropTypes.bool,
  title: PropTypes.string,
  component: PropTypes.object,
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
};

const mapStoreToProps = store => ({
  open: store.modal.showModal,
  title: store.modal.title,
  component: store.modal.component,
});

const mapDispatchToProps = dispatch => ({
  modalActionCreators: bindActionCreators(modalAction, dispatch),
});

const withConnect = connect(mapStoreToProps, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(CommonModal);
