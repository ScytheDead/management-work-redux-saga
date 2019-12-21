import {
  fork,
  take,
  call,
  put,
  delay,
  takeLatest,
  select,
} from 'redux-saga/effects';
import * as taskTypes from '../constants/task';
import { getList } from '../apis/task';
import { STATUSES_CODE } from '../constants';
import {
  fetchListTaskSuccess,
  fetchListTaskFailed,
  filterListTaskSuccess,
} from '../actions/task';
import { showLoading, hideLoading } from '../actions/ui';

function* watchFetchListTaskAction() {
  yield take(taskTypes.FETCH_TASK);
  yield put(showLoading());
  const response = yield call(getList);
  const { status, data } = response;
  if (status === STATUSES_CODE.SUCCESS) {
    // dispatch action fetchListTaskSuccess
    yield put(fetchListTaskSuccess(data));
  } else {
    // dispatch action fetchListTaskFailed
    yield put(fetchListTaskFailed(data));
  }
  yield delay(1000);
  yield put(hideLoading());
}

function* filterTaskSaga({ payload }) {
  yield delay(500);
  const { keyword } = payload;
  const listTasks = yield select(store => store.task.listTasks);
  const listTaskFiltered = listTasks.filter(task =>
    task.title
      .trim()
      .toLowerCase()
      .includes(keyword.trim().toLowerCase()),
  );
  yield put(filterListTaskSuccess(listTaskFiltered));
}

function* rootSaga() {
  yield fork(watchFetchListTaskAction);
  yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga);
}

export default rootSaga;
