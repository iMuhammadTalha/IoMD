import Home from './Home';
import {authRoles} from 'app/auth';

export const HomeConfig = {
    settings: {
        layout: {
            config: {
                navbar: {
                    display: false
                },
                toolbar: {
                    display: false
                },
                footer: {
                    display: false
                },
                leftSidePanel: {
                    display: false
                },
                rightSidePanel: {
                    display: false
                }
            }
        }
    },
    // auth: authRoles.onlyGuest,
    routes: [
        {
            path: '/home',
            component: Home
        }
    ]
};
