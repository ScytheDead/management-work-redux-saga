import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
} from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './styles';

const renderFromHelper = ({ touched, error }) => {
  if (!(touched && error)) {
    return null;
  }
  return <FormHelperText>{touched && error}</FormHelperText>;
};

renderFromHelper.propTypes = {
  touched: PropTypes.bool,
  error: PropTypes.bool,
};

const renderSelectField = ({
  input,
  label,
  classes,
  meta: { touched, error },
  children,
  ...custom
}) => (
  <FormControl error={touched && error} className={classes.formControl}>
    <InputLabel htmlFor="age-native-simple">{label}</InputLabel>
    <Select
      {...input}
      {...custom}
      inputProps={{
        name: 'status',
        id: 'age-native-simple',
      }}
    >
      {children}
    </Select>
    {renderFromHelper({ touched, error })}
  </FormControl>
);

renderSelectField.propTypes = {
  classes: PropTypes.object,
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
  children: PropTypes.array,
};

export default withStyles(styles)(renderSelectField);
