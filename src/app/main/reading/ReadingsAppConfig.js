import ReadingsApp from './ReadingsApp';

export const ReadingsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes: [
        {
            path: '/readings',
            component: ReadingsApp
        }
    ]
};
