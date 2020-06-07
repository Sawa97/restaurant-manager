import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import SecurityService from '../service/SecurityService';

class AuthenticatedRoute extends Component {
    render() {
        if (SecurityService.isUserLoggedIn()) {
            return <Route {...this.props} />
        } else {
            return <Redirect to="/login" />
        }

    }
}

export default AuthenticatedRoute