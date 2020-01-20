import { Drawer, List, ListItem, withStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../../constants';
import styles from './styles';

function Sidebar(props) {
  const { classes, isOpenSidebar } = props;

  function renderListMenu() {
    return (
      <div className={classes.list}>
        <List>
          {ADMIN_ROUTES.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              exact={item.exact}
              className={classes.menuLink}
              activeClassName={classes.menuLinkActive}
            >
              <ListItem className={classes.menuItem} button>
                {item.name}
              </ListItem>
            </NavLink>
          ))}
        </List>
      </div>
    );
  }
  return (
    <Drawer
      classes={{
        paper: classes.drawerPaper,
      }}
      open={isOpenSidebar}
      variant="persistent"
    >
      {renderListMenu()}
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object,
  isOpenSidebar: PropTypes.bool,
  hideSidebar: PropTypes.func,
};

export default withStyles(styles)(Sidebar);
