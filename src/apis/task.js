import _ from 'lodash';
import queryString from 'query-string';
import axiosService from '../commons/axiosService';
import { API_ENDPOINT } from '../constants';

const url = '/tasks';

export const getList = params => {
  let queryPapams = '';
  if (!_.isEmpty(params)) {
    queryPapams = `?${queryString.stringify(params)}`;
  }
  return axiosService.get(`${API_ENDPOINT}${url}${queryPapams}`);
};

export const addTask = data => {
  return axiosService.post(`${API_ENDPOINT}${url}`, data);
};
