import * as taskConstants from '../constants/task';
import { toastError, toastSuccess } from '../helpers/toastHelper';

const initialState = {
  listTasks: [],
  taskEditing: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case taskConstants.FETCH_TASK:
      return {
        ...state,
        listTasks: [],
      };
    case taskConstants.FETCH_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTasks: data,
      };
    }
    case taskConstants.FETCH_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
        listTasks: [],
      };
    }
    case taskConstants.FILTER_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.FILTER_TASK_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listTasks: data,
      };
    }
    case taskConstants.ADD_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.ADD_TASK_SUCCESS: {
      const { data } = action.payload;
      toastSuccess('✔️ Thêm công việc thành công');
      return {
        ...state,
        listTasks: [data].concat(state.listTasks), // function concat is connect 2 arrays
      };
    }
    case taskConstants.ADD_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskConstants.SET_TASK_EDITING: {
      const { task } = action.payload;
      return {
        ...state,
        taskEditing: task,
      };
    }
    case taskConstants.UPDATE_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.UPDATE_TASK_SUCCESS: {
      const { data } = action.payload;
      const { listTasks, taskEditing } = state;
      const listTasksUpdated = [...listTasks];
      const indexTaskUpdate = listTasksUpdated.findIndex(
        task => task.id === taskEditing.id,
      );
      listTasksUpdated[indexTaskUpdate] = data;
      toastSuccess('✔️ Cập nhật công việc thành công');
      return {
        ...state,
        listTasks: listTasksUpdated,
      };
    }
    case taskConstants.UPDATE_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    case taskConstants.DELETE_TASK: {
      return {
        ...state,
      };
    }
    case taskConstants.DELETE_TASK_SUCCESS: {
      const { id } = action.payload;
      toastSuccess('✔️ Xóa công việc thành công');
      return {
        ...state,
        listTasks: state.listTasks.filter(task => task.id !== id),
      };
    }
    case taskConstants.DELETE_TASK_FAILED: {
      const { error } = action.payload;
      toastError(error);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducer;
