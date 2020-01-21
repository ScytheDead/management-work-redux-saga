import { withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles';
import Header from './Header';
import Sidebar from './Sidebar';
import * as uiActions from '../../actions/ui';
import cn from 'classnames';

class Dashboard extends Component {
  handleToggleSidebar = value => {
    const { uiActionCreators } = this.props;
    const { showSidebar, hideSidebar } = uiActionCreators;
    if (value === true) {
      showSidebar();
    } else {
      hideSidebar();
    }
  };

  render() {
    const { children, classes, name, isOpenSidebar } = this.props;
    return (
      <div className={classes.dashboard}>
        <Header
          name={name}
          isOpenSidebar={isOpenSidebar}
          handleToggleSidebar={this.handleToggleSidebar}
        />
        <div className={classes.wrapper}>
          <Sidebar isOpenSidebar={isOpenSidebar} />
          <div
            className={cn(classes.wrapperContent, {
              [classes.shiftLeft]: !isOpenSidebar,
            })}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  children: PropTypes.object,
  classes: PropTypes.object,
  name: PropTypes.string,
  isOpenSidebar: PropTypes.bool,
  uiActionCreators: PropTypes.shape({
    showSidebar: PropTypes.func,
    hideSidebar: PropTypes.func,
  }),
};

const mapStoreToProps = store => ({
  isOpenSidebar: store.ui.showSidebar,
});

const mapDispatchToProps = dispatch => ({
  uiActionCreators: bindActionCreators(uiActions, dispatch),
});

const withConnect = connect(mapStoreToProps, mapDispatchToProps);

export default compose(withConnect, withStyles(styles))(Dashboard);
