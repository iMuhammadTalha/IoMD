import VitalsApp from './VitalsApp';

export const VitalsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/vitals',
            component: VitalsApp
        }
    ]
};
