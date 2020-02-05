import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';

class DefaultLayoutRoute extends Component {
  render() {
    const { component: CustomComponent, ...remainProps } = this.props;
    return (
      <Route
        {...remainProps}
        render={routeProps => <CustomComponent {...routeProps} />}
      />
    );
  }
}

DefaultLayoutRoute.propTypes = {
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
};

export default DefaultLayoutRoute;
