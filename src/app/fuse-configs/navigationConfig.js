import jwt from 'jsonwebtoken';
// import { Redirect } from 'react-router-dom';

let role = null;
const token = localStorage.getItem('jwtToken');
if (token) {
    var bearer = token.split(' ');

    try {
        const decoded = jwt.verify(bearer[1], 'secret');
        if (decoded) {
            role = decoded.role;
        }
    } catch (err) {
        if (err) {
            console.log(err);
            this.props.history.push('/login');
        }
    }
}
else
{
  if(window.location.pathname === '/su-admin/'||window.location.pathname === '/su-admin') {
    window.location = '/su-admin/login';
  }
}
const superAdminNavigationConfig = [
    {
        id: 'Readings',
        title: 'Navigation',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'dashboard',
                title: 'Dashbaord',
                type: 'item',
                icon: 'whatshot',
                url: '/dashboard'
            },
            {
                id: 'doctor',
                title: 'Doctors',
                type: 'item',
                icon: 'whatshot',
                url: '/doctors'
            },
            {
                id: 'patient',
                title: 'Patients',
                type: 'item',
                icon: 'whatshot',
                url: '/patients'
            },
           
        ]
    },
    {
        id: 'report-group',
        title: 'Account',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'logout-component',
                title: 'Logout',
                type: 'item',
                url: '/logout',
                icon: 'exit_to_app',
            }
        ]
    }
];


localStorage.setItem('Role', role);
var navigationConfig =
    role === 'superAdmin'
        ? superAdminNavigationConfig
        : superAdminNavigationConfig;
export default navigationConfig;
