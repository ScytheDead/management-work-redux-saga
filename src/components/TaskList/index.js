import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import styles from './styles';
import TaskItem from '../TaskItem';

class TaskList extends Component {
  render() {
    const { tasks, status, editTask } = this.props;
    return (
      <Grid item md={4} xs={12} key={status.value}>
        <Box mt={2} mb={2}>
          <div>{status.label}</div>
        </Box>
        <div>
          {tasks.map(task => {
            return (
              <TaskItem
                task={task}
                status={status}
                key={task.id}
                editTask={editTask}
              />
            );
          })}
        </div>
      </Grid>
    );
  }
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  status: PropTypes.shape({
    value: PropTypes.number,
    label: PropTypes.string,
  }),
  editTask: PropTypes.func,
};

export default withStyles(styles)(TaskList);
