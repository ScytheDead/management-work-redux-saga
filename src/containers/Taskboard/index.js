import { Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as modalActions from '../../actions/modal';
import * as taskActions from '../../actions/task';
import SearchBox from '../../components/SearchBox';
import TaskForm from '../../components/TaskForm';
import TaskList from '../../components/TaskList/index';
import { STATUSES } from '../../constants';
import styles from './styles';

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

  openConfirmDeleteForm = task => {
    const { modalActionsCreators, taskActionCreators, classes } = this.props;
    const {
      showModal,
      hideModal,
      changeTitleModal,
      changeContentModal,
    } = modalActionsCreators;
    const { deleteTask } = taskActionCreators;
    showModal();
    changeTitleModal('Xác nhận xóa công việc');
    changeContentModal(
      <div>
        <div>
          Bạn có chắc chắn muốn xóa{' '}
          <span className={classes.textBold}>{task.title}</span> ?
        </div>

        <Box display="flex" flexDirection="row-reverse" mt={2}>
          <Box ml={1}>
            <Button variant="contained" onClick={hideModal}>
              Hủy bỏ
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => deleteTask({ id: task.id })}
              color="primary"
            >
              Đồng ý
            </Button>
          </Box>
        </Box>
      </div>,
    );
  };

  handleChange = event => {
    const { value } = event.target;
    const { taskActionCreators } = this.props;
    const { filterListTask } = taskActionCreators;
    filterListTask(value);
  };

  handleDelete = task => {
    this.openConfirmDeleteForm(task);
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
