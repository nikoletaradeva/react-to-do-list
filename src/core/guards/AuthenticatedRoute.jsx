import React from 'react';
import { getLoggedUser } from '../api/users.api';
import { Redirect } from 'react-router-dom';

export function AuthenticatedRoute(props) {
    const loggedUser = getLoggedUser();

    if (props.admin && loggedUser.isAdmin) {
        return <props.component {...props} />
    }

    if (!props.admin && loggedUser) {
        return <props.component {...props} />
    }

    return <Redirect to='/login' />;
}