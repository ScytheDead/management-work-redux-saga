import { Box, Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import styles from './styles';
import * as modalAction from '../../actions/modal';

class TaskForm extends Component {
  render() {
    const { classes, modalActionCreators } = this.props;
    const { hideModal } = modalActionCreators;
    return (
      <form>
        <Grid container>
          <Grid item md={12}>
            <TextField
              id="standard-name"
              label="Tiêu đề"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              id="standard-multiline-flexible"
              label="Mô tả"
              multiline
              rowsMax="4"
              className={classes.textField}
              margin="normal"
            />
          </Grid>
          <Grid item md={12}>
            <Box display="flex" flexDirection="row-reverse" mt={2}>
              <Box ml={1}>
                <Button variant="contained" onClick={hideModal}>
                  Hủy bỏ
                </Button>
              </Box>
              <Button variant="contained" color="primary">
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
  classes: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  modalActionCreators: bindActionCreators(modalAction, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withStyles(styles), withConnect)(TaskForm);
