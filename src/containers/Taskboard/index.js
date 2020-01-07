import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskForm from '../../components/TaskForm';
import { STATUSES } from '../../constants';
import TaskList from '../../components/TaskList/index';
import styles from './styles';
import * as taskActions from '../../actions/task';
import * as modalActions from '../../actions/modal';
import SearchBox from '../../components/SearchBox';

class TaskBoard extends Component {
  componentDidMount() {
    const { taskActionCreators } = this.props;
    const { fetchListTask } = taskActionCreators;
    fetchListTask();
  }

  openForm = task => {
    const { modalActionsCreators, taskActionCreators } = this.props;
    const { setTaskEditing } = taskActionCreators;
    const {
      showModal,
      changeTitleModal,
      changeContentModal,
    } = modalActionsCreators;
    showModal();
    // Check editing or add new
    if (task && task.id) {
      changeTitleModal('Chỉnh sửa công việc');
      setTaskEditing(task);
    } else {
      changeTitleModal('Thêm mới công việc');
      setTaskEditing(null);
    }
    changeContentModal(<TaskForm />);
  };

  handleChange = event => {
    const { value } = event.target;
    const { taskActionCreators } = this.props;
    const { filterListTask } = taskActionCreators;
    filterListTask(value);
  };

  handleDelete = task => {
    const { taskActionCreators } = this.props;
    const { deleteTask } = taskActionCreators;
    deleteTask({ id: task.id });
  };

  searchBox() {
    let xhtml = null;
    xhtml = <SearchBox handleChange={this.handleChange} />;
    return xhtml;
  }

  renderBoard() {
    let xhtml = null;
    const { listTask } = this.props;
    if (listTask && listTask.length > 0) {
      xhtml = (
        <Grid container spacing={2}>
          {STATUSES.map(status => {
            const taskFilter = listTask.filter(
              task => task.status === status.value,
            );
            return (
              <TaskList
                tasks={taskFilter}
                status={status}
                key={status.value}
                editTask={this.openForm}
                deleteTask={this.handleDelete}
              />
            );
          })}
        </Grid>
      );
    }
    return xhtml;
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.taskBoard}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.openForm}
        >
          <AddIcon /> Thêm mới công việc
        </Button>
        {this.searchBox()}
        {this.renderBoard()}
      </div>
    );
  }
}

TaskBoard.propTypes = {
  classes: PropTypes.object,
  taskActionCreators: PropTypes.shape({
    fetchListTask: PropTypes.func,
    filterListTask: PropTypes.func,
    setTaskEditing: PropTypes.func,
    deleteTask: PropTypes.func,
  }),
  listTask: PropTypes.array,
  modalActionsCreators: PropTypes.shape({
    showModal: PropTypes.func,
    hideModal: PropTypes.func,
    changeTitleModal: PropTypes.func,
    changeContentModal: PropTypes.func,
  }),
};

const mapStateToProps = store => {
  return {
    listTask: store.task.listTasks,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    taskActionCreators: bindActionCreators(taskActions, dispatch),
    modalActionsCreators: bindActionCreators(modalActions, dispatch),
  };
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TaskBoard),
);
