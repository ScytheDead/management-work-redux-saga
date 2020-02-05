import React, { Component } from 'react';
import {
  withStyles,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './styles';

class SignupPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.background}>
        <div className={classes.signup}>
          <Card>
            <CardContent>
              <form>
                <div className="text-xs-center pb-xs">
                  <Typography variant="caption">Create new account</Typography>
                </div>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.TextField}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="password"
                  label="Password"
                  className={classes.TextField}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  id="cPassword"
                  label="Confirm Password"
                  className={classes.TextField}
                  type="password"
                  fullWidth
                  margin="normal"
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="I accept policies and terms"
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  type="submit"
                >
                  Signup
                </Button>
                <div className="pt-1 text-md-center">
                  <Link to="/">
                    <Button>YOU HAVE AN ACCOUNT ALREADY ?</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(SignupPage);
