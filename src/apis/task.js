import _ from 'lodash';
import queryString from 'query-string';
import axiosService from '../commons/axiosService';
import { API_ENDPOINT } from '../constants';

const url = 'tasks';

export const getList = params => {
  let queryPapams = '';
  if (!_.isEmpty(params)) {
    queryPapams = `${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}/${url}?${queryPapams}`);
};

export const addTask = task => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, task);
};

export const updateTask = taskUpdate => {
  const { id } = taskUpdate;
  console.log(taskUpdate);
  return axiosService.put(`${API_ENDPOINT}/${url}/${id}`, taskUpdate);
};
