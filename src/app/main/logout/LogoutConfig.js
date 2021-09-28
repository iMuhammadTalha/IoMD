import React from 'react';
import store from 'app/store';
import {logoutUser} from 'app/auth/store/actions/login.actions';
import {Redirect} from 'react-router-dom';

export const LogoutConfig = {
    // auth: authRoles.user,
    routes: [
        {
            path: '/logout',
            component: () => {
                store.dispatch(logoutUser());
                if (localStorage.getItem('Role') === 'su-admin') {
                    localStorage.removeItem('Role');
                    return <Redirect to="/su-admin/login"/>;
                } else if (localStorage.getItem('Role') === 'admin') {
                    localStorage.removeItem('Role');
                    return <Redirect to="/admin/login"/>;
                }  else if (localStorage.getItem('Role') === 'doctor') {
                    localStorage.removeItem('Role');
                    return <Redirect to="/doctor/login"/>;
                } else if (localStorage.getItem('Role') === 'patient') {
                    localStorage.removeItem('Role');
                    return <Redirect to="/patient/login"/>;
                } else if (localStorage.getItem('Role') === 'caretaker') {
                    localStorage.removeItem('Role');
                    return <Redirect to="/caretaker/login"/>;
                } else {
                    localStorage.removeItem('Role');
                    return <Redirect to="/login"/>;
                }
            }
        }
    ]
};
