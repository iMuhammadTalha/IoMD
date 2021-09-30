import DashBoardApp from "./DashBoardApp";
import { authRoles } from "app/auth";

export const DashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    // auth: authRoles.all,
    routes: [
        {
            path: "/dashboard",
            component: DashBoardApp
        }
    ]
};
