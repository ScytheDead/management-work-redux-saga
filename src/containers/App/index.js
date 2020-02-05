import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../commons/theme';
import GlobalLoading from '../../components/GlobalLoading';
import CommonModal from '../../components/Modal/index.js';
import configureStore from '../../redux/configureStore';
import styles from './styles.js';
import { ADMIN_ROUTES, ROUTES } from '../../constants';
import AdminLayoutRoute from '../../commons/Layout/AdminLayoutRoute';
import DefaultLayoutRoute from '../../commons/Layout/DefaultLayoutRoute';

const store = configureStore();

class App extends Component {
  renderAdminRoutes() {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map(route => {
      return (
        <AdminLayoutRoute
          key={route.path}
          name={route.name}
          path={route.path}
          component={route.component}
          exact={route.exact}
        />
      );
    });
    return xhtml;
  }

  renderDefaultRoutes() {
    let xhtml = null;
    xhtml = ROUTES.map(route => (
      <DefaultLayoutRoute
        key={route.path}
        name={route.name}
        path={route.path}
        component={route.component}
        exact={route.exact}
      />
    ));
    return xhtml;
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <Switch>{this.renderAdminRoutes()}</Switch>
            <Switch>{this.renderDefaultRoutes()}</Switch>
            <CommonModal />
            <ToastContainer />
            <GlobalLoading />
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
