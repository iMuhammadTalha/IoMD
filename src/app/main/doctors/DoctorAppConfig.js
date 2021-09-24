import DoctorApp from "./DoctorApp";
import { authRoles } from "app/auth";

export const DoctorAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    // auth: authRoles.admin,
    routes: [
        {
            path: "/doctors",
            component: DoctorApp
        }
    ]
};
