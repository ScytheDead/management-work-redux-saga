import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from 'redux-saga/effects';
import { hideModal, showModal } from '../actions/modal';
import {
  addTaskFailed,
  addTaskSuccess,
  fetchListTask,
  fetchListTaskFailed,
  fetchListTaskSuccess,
  updateTaskSuccess,
  updateTaskFailed,
  deleteTaskSuccess,
} from '../actions/task';
import { hideLoading, showLoading } from '../actions/ui';
import { addTask, getList, updateTask, deleteTask } from '../apis/task';
import { STATUSES, STATUSES_CODE } from '../constants';
import * as taskTypes from '../constants/task';

function* watchFetchListTaskAction() {
  while (true) {
    const action = yield take(taskTypes.FETCH_TASK);
    const { params } = action.payload;
    const response = yield call(getList, params);
    const { status, data } = response;
    if (status === STATUSES_CODE.SUCCESS) {
      // dispatch action fetchListTaskSuccess
      yield put(fetchListTaskSuccess(data));
    } else {
      // dispatch action fetchListTaskFailed
      yield put(fetchListTaskFailed(data));
    }
  }
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  yield put(fetchListTask({ q: keyword }));
}

function* addTaskSaga({ payload }) {
  const { title, description } = payload;
  yield put(showLoading());
  yield put(hideModal());
  const response = yield call(addTask, {
    title,
    description,
    status: STATUSES[0].value,
  });
  const { data, status } = response;
  if (status === STATUSES_CODE.CREATED) {
    yield put(addTaskSuccess(data));
  } else {
    yield put(addTaskFailed(data));
    yield put(showModal());
  }
  yield put(hideLoading());
}

function* updateTaskSaga({ payload }) {
  yield put(showLoading());
  yield put(hideModal());
  const { title, description, status } = payload;
  const taskEditing = yield select(store => store.task.taskEditing);
  const response = yield call(updateTask, {
    ...taskEditing,
    title,
    description,
    status,
  });

  const { data, status: statusUpdated } = response;
  if (statusUpdated === STATUSES_CODE.SUCCESS) {
    yield put(updateTaskSuccess(data));
  } else {
    yield put(updateTaskFailed(data));
    yield put(showModal());
  }
  yield put(hideLoading());
}

function* deleteTaskSaga({ payload }) {
  yield put(showLoading());
  const { id } = payload.task;
  const response = yield call(deleteTask, id);
  const { status } = response;
  if (status === STATUSES_CODE.SUCCESS) {
    yield put(deleteTaskSuccess(id));
    yield put(hideModal());
  }
  yield put(hideLoading());
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
  yield takeEvery(taskTypes.ADD_TASK, addTaskSaga);
  yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga);
  yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga);
}

export default rootSaga;
