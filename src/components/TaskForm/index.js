import { Box, Grid, MenuItem } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { Field, reduxForm } from 'redux-form';
import * as modalAction from '../../actions/modal';
import * as taskAction from '../../actions/task';
import renderSelectField from '../FormHelper/Select';
import renderTextField from '../FormHelper/TextField';
import styles from './styles';
import validate from './validate';

class TaskForm extends Component {
  handleSubmitForm = data => {
    const { taskActionCreators, taskEditing } = this.props;
    const { addTask, updateTask } = taskActionCreators;
    if (taskEditing && taskEditing.id) {
      updateTask(data);
    } else {
      addTask(data);
    }
  };

  renderStatusSelection() {
    const { taskEditing, classes } = this.props;
    let xhtml = null;
    if (taskEditing && taskEditing.id) {
      xhtml = (
        <Field
          id="status"
          label="Tnạng thái"
          className={classes.select}
          component={renderSelectField}
          name="status"
        >
          <MenuItem value={0}>Ready</MenuItem>
          <MenuItem value={1}>In Progress</MenuItem>
          <MenuItem value={2}>Completed</MenuItem>
        </Field>
      );
    }
    return xhtml;
  }

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
          {this.renderStatusSelection()}
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
    updateTask: PropTypes.func,
  }),
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
  submitting: PropTypes.bool,
  taskEditing: PropTypes.object,
};

const mapStoreToProps = store => ({
  taskEditing: store.task.taskEditing,
  initialValues: {
    title: store.task.taskEditing ? store.task.taskEditing.title : '',
    description: store.task.taskEditing
      ? store.task.taskEditing.description
      : '',
    status: store.task.taskEditing ? store.task.taskEditing.status : '',
  },
});

const mapDispatchToProps = dispatch => ({
  modalActionCreators: bindActionCreators(modalAction, dispatch),
  taskActionCreators: bindActionCreators(taskAction, dispatch),
});

const withConnect = connect(mapStoreToProps, mapDispatchToProps);

const withForm = reduxForm({
  form: 'TASK_MANAGEMENT',
  validate,
});

export default compose(withStyles(styles), withConnect, withForm)(TaskForm);
