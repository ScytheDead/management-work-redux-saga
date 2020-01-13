import AdminHomePage from '../containers/AdminHomePage';
import TaskBoard from '../containers/Taskboard';

export const API_ENDPOINT = 'http://localhost:3000';

export const STATUSES = [
  {
    value: 0,
    label: 'READY',
  },
  {
    value: 1,
    label: 'IN PROGRESS',
  },
  {
    value: 2,
    label: 'COMPLETED',
  },
];

export const STATUSES_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  UPDATED: 202,
};

export const ADMIN_ROUTES = [
  {
    name: 'Trang quản trị',
    path: '/',
    component: AdminHomePage,
    exact: true,
  },
  {
    name: 'Quản lý công việc',
    path: '/task-board',
    component: TaskBoard,
    exact: true,
  },
];
