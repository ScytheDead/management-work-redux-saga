import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalAction from '../../actions/modal';
import * as taskAction from '../../actions/task';
import renderTextField from '../FormHelper';
import styles from './styles';
import validate from './validate';

class TaskForm extends Component {
  handleSubmitForm = data => {
    console.log('data: ', data);
    const { taskActionCreators } = this.props;
    const { addTask } = taskActionCreators;
    const { title, description } = data;
    addTask({ title, description });
  };

  render() {
    const {
      classes,
      modalActionCreators,
      handleSubmit,
      invalid,
      submitting,
    } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <form onSubmit={handleSubmit(this.handleSubmitForm)}>
        <Grid container>
          <Grid item md={12}>
            <Field
              id="title"
              label="Tiêu đề"
              className={classes.textField}
              margin="normal"
              name="title"
              component={renderTextField}
            />
          </Grid>
          <Grid item md={12}>
            <Field
              id="description"
              label="Mô tả"
              multiline
              rowsMax="4"
              className={classes.textField}
              margin="normal"
              component={renderTextField}
              name="description"
            />
          </Grid>
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModal}>
                  Hủy bỏ
                </Button>
              </Box>
              <Button
                disabled={invalid || submitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                Lưu lại
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    );
  }
}

TaskForm.propTypes = {
  modalActionCreators: PropTypes.shape({
    hideModal: PropTypes.func,
  }),
  taskActionCreators: PropTypes.shape({
    addTask: PropTypes.func,
  }),
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
};

const mapDispatchToProps = dispatch => ({
  modalActionCreators: bindActionCreators(modalAction, dispatch),
  taskActionCreators: bindActionCreators(taskAction, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

const withForm = reduxForm({
  form: 'TASK_MANAGEMENT',
  validate,
});

export default compose(withStyles(styles), withConnect, withForm)(TaskForm);
