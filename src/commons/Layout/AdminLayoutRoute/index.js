import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import Dashboard from '../../../components/Dashboard';

class AdminLayoutRoute extends Component {
  render() {
    const { component: CustomComponent, ...remainProps } = this.props;
    return (
      <Route
        {...remainProps}
        render={routeProps => (
          <Dashboard {...remainProps}>
            <CustomComponent {...routeProps} />
          </Dashboard>
        )}
      />
    );
  }
}

AdminLayoutRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default AdminLayoutRoute;
