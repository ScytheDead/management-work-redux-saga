import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from './styles';
import TaskForm from '../../components/TaskForm';
import * as modalActions from '../../actions/modal';

class TaskItem extends Component {
  openForm = () => {
    const { modalActionsCreators } = this.props;
    const {
      showModal,
      changeTitleModal,
      changeContentModal,
    } = modalActionsCreators;
    showModal();
    changeTitleModal('Chỉnh sửa công việc');
    changeContentModal(<TaskForm />);
  };

  render() {
    const { classes, task, status } = this.props;
    const { id, title, description } = task;
    return (
      <Card key={id} className={classes.card}>
        <CardContent>
          <Grid container justify="space-between">
            <Grid item md={8}>
              <Typography component="h2">{title}</Typography>
            </Grid>
            <Grid item md={4}>
              {status.label}
            </Grid>
            <p>{description}</p>
          </Grid>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Fab
            color="primary"
            aria-label="edit"
            className={classes.fab}
            size="small"
            onClick={this.openForm}
          >
            <Icon fontSize="small">edit</Icon>
          </Fab>
          <Fab
            color="primary"
            aria-label="delete"
            className={classes.fab}
            size="small"
          >
            <Icon fontSize="small">delete</Icon>
          </Fab>
        </CardActions>
      </Card>
    );
  }
}

TaskItem.propTypes = {
  classes: PropTypes.object,
  task: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  status: PropTypes.object,
  modalActionsCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeTitleModal: PropTypes.func,
    changeContentModal: PropTypes.func,
  }),
};

const mapStoreToProps = null;

const mapDispatchToProps = dispatch => ({
  modalActionsCreators: bindActionCreators(modalActions, dispatch),
});

export default withStyles(styles)(
  connect(mapStoreToProps, mapDispatchToProps)(TaskItem),
);
