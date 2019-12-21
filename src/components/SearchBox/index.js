import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';
import styles from './styles';

class SearchBox extends Component {
  render() {
    const { classes, handleChange } = this.props;
    return (
      <form className={classes.root} noValidate autoComplete="off">
        <TextField
          autoComplete="off"
          onChange={handleChange}
          placeholder="Nhập từ khóa..."
          className={classes.textField}
        />
      </form>
    );
  }
}

SearchBox.propTypes = {
  classes: PropTypes.object,
  handleChange: PropTypes.func,
};

export default withStyles(styles)(SearchBox);
