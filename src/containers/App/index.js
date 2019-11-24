import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import styles from './styles.js';
import Taskboard from '../Taskboard/index.js';
import theme from '../../commons/theme';

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Taskboard />
      </ThemeProvider>
    );
  }
}

export default withStyles(styles)(App);
