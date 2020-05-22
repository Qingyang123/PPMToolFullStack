import React, { Component } from 'react';
import PropTypes from "prop-types";
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


const ProtectedRoute = ({ component: Component, auth, ...otherProps }) => (
    <Route {...otherProps} render={props => (
        auth.validToken === true ? <Component {...props}/> : <Redirect to='/login'/>
    )}/>
) 

ProtectedRoute.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(ProtectedRoute);
