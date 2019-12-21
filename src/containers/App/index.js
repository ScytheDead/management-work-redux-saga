import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import styles from './styles.js';
import Taskboard from '../Taskboard/index.js';
import theme from '../../commons/theme';
import configureStore from '../../redux/configureStore';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from '../../components/GlobalLoading';
import CommonModal from '../../components/Modal/index.js';

const store = configureStore();

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Taskboard />
          <CommonModal />
          <ToastContainer />
          <GlobalLoading />
        </ThemeProvider>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
