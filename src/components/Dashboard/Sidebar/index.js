import { withStyles, Drawer, ListItem, List } from '@material-ui/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './styles';
import { ADMIN_ROUTES } from '../../../constants';

function Sidebar(props) {
  const [isOpen, setIsOpen] = useState(true);
  const { classes } = props;
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
      open={isOpen}
      onClose={() => setIsOpen(false)}
      variant="persistent"
    >
      {renderListMenu()}
    </Drawer>
  );
}

Sidebar.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(Sidebar);
