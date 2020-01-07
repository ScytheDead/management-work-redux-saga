import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './styles';

class TaskItem extends Component {
  render() {
    const { classes, task, status, editTask, deleteTask } = this.props;
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
            onClick={() => editTask(task)}
          >
            <Icon fontSize="small">edit</Icon>
          </Fab>
          <Fab
            color="primary"
            aria-label="delete"
            className={classes.fab}
            size="small"
            onClick={() => deleteTask(task)}
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
  editTask: PropTypes.func,
  deleteTask: PropTypes.func,
};

export default withStyles(styles)(TaskItem);
