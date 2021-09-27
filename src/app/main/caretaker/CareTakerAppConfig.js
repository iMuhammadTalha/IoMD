import CareTakerApp from "./CareTakerApp";
import { authRoles } from "app/auth";

export const CareTakerAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    // auth: authRoles.admin,
    routes: [
        {
            path: "/careTakers",
            component: CareTakerApp
        }
    ]
};
