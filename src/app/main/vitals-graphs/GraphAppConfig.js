/** @format */

import GraphApp from "./GraphApp";
import {authRoles} from "app/auth";

export const GraphsAppConfig = {
    settings: {
        layout: {
            config: {},
        },
    },
    auth: authRoles.fleet,
    routes: [
        {
            path: "/vitals-graphs",
            component: GraphApp,
        },
    ],
};
