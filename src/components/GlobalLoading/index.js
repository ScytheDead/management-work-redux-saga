import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import iconLoading from '../../assets/images/loading.gif';

class GlobalLoading extends Component {
  render() {
    const { classes, showLoading } = this.props;
    let xhtml = null;
    if (showLoading) {
      xhtml = (
        <div className={classes.globalLoading}>
          <img src={iconLoading} alt="loading" className={classes.icon} />
        </div>
      );
    }
    return xhtml;
  }
}

GlobalLoading.propType = {
  classes: PropTypes.object,
  showLoading: PropTypes.bool,
};

const mapStoreToProps = store => {
  return {
    showLoading: store.ui,
  };
};

const withConnect = connect(mapStoreToProps, null);

export default compose(withStyles(styles), withConnect)(GlobalLoading);
