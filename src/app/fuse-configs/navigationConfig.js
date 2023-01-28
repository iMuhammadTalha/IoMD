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
            console.log('EROR',err);
            this.props.history.push('/login');
        }
    }
}
else
{
  if(window.location.pathname === '/su-admin/'||window.location.pathname === '/su-admin') {
    window.location = '/home';
  } else if(window.location.pathname === '/admin/') {
    window.location = '/admin/login';
  } else if(window.location.pathname === '/doctor/') {
    window.location = '/doctor/login';
  } else if(window.location.pathname === '/patient/') {
    window.location = '/patient/login';
  } else if(window.location.pathname === '/caretaker/') {
    window.location = '/caretaker/login';
  }
}
const superAdminNavigationConfig = [
    {
        id: 'Readings',
        title: 'Admin Navigation',
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
            {
                id: 'careTaker',
                title: 'Care Taker',
                type: 'item',
                icon: 'whatshot',
                url: '/careTakers'
            }
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

const adminNavigationConfig = [
    {
        id: 'Readings',
        title: '',
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
            {
                id: 'careTaker',
                title: 'Care Taker',
                type: 'item',
                icon: 'whatshot',
                url: '/careTakers'
            }
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

const doctorNavigationConfig = [
    {
        id: 'Readings',
        title: '',
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
            // {
            //     id: 'vitals',
            //     title: 'Vitals',
            //     type: 'item',
            //     icon: 'whatshot',
            //     url: '/doctors'
            // },
            {
                id: 'patient',
                title: 'Patients',
                type: 'item',
                icon: 'whatshot',
                url: '/patients'
            },
            {
                id: 'careTaker',
                title: 'Care Taker',
                type: 'item',
                icon: 'whatshot',
                url: '/careTakers'
            }
        ]
    },
    {
        id: 'vitals-group',
        title: 'Vitals',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'vitals-tabular',
                title: 'Vitals Data',
                type: 'item',
                url: '/vitals',
                icon: 'whatshot',
            },
            // {
            //     id: 'vitals-graphical',
            //     title: 'ECG Graph',
            //     type: 'item',
            //     url: '/vitals-graph',
            //     icon: 'whatshot',
            // },
            {
                id: 'vitals-graphical',
                title: 'Vitals Graph',
                type: 'item',
                url: '/vitals-graphs',
                icon: 'whatshot',
            }
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

const patientNavigationConfig = [
    {
        id: 'Readings',
        title: '',
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
            // {
            //     id: 'history',
            //     title: 'History',
            //     type: 'item',
            //     icon: 'whatshot',
            //     url: '/patients'
            // },
            // {
            //     id: 'medication',
            //     title: 'Medication',
            //     type: 'item',
            //     icon: 'whatshot',
            //     url: '/careTakers'
            // }
        ]
    },
    {
        id: 'vitals-group',
        title: 'Vitals',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'vitals-tabular',
                title: 'Vitals Data',
                type: 'item',
                url: '/vitals',
                icon: 'whatshot',
            },
            // {
            //     id: 'vitals-graphical',
            //     title: 'ECG Graph',
            //     type: 'item',
            //     url: '/vitals-graph',
            //     icon: 'whatshot',
            // },
            {
                id: 'vitals-graphical',
                title: 'Vitals Graph',
                type: 'item',
                url: '/vitals-graphs',
                icon: 'whatshot',
            }
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

const caretakerNavigationConfig = [
    {
        id: 'Readings',
        title: '',
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
            // {
            //     id: 'history',
            //     title: 'History',
            //     type: 'item',
            //     icon: 'whatshot',
            //     url: '/patients'
            // },
            // {
            //     id: 'medication',
            //     title: 'Medication',
            //     type: 'item',
            //     icon: 'whatshot',
            //     url: '/careTakers'
            // }
        ]
    },
    {
        id: 'vitals-group',
        title: 'Vitals',
        type: 'group',
        icon: 'whatshot',
        children: [
            {
                id: 'vitals-tabular',
                title: 'Vitals Data',
                type: 'item',
                url: '/vitals',
                icon: 'whatshot',
            },
            // {
            //     id: 'vitals-graphical',
            //     title: 'ECG Graph',
            //     type: 'item',
            //     url: '/vitals-graph',
            //     icon: 'whatshot',
            // },
            {
                id: 'vitals-graphical',
                title: 'Vitals Graph',
                type: 'item',
                url: '/vitals-graphs',
                icon: 'whatshot',
            }
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
    role === 'admin' ? adminNavigationConfig
        : role === 'doctor' ? doctorNavigationConfig
        : role === 'patient' ? patientNavigationConfig 
        : role === 'caretaker' ? caretakerNavigationConfig 
        : superAdminNavigationConfig;
export default navigationConfig;


