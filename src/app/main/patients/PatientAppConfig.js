import PatientApp from "./PatientApp";
import { authRoles } from "app/auth";

export const PatientAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    // auth: authRoles.admin,
    routes: [
        {
            path: "/patients",
            component: PatientApp
        }
    ]
};
