/** @format */

import React from "react";
import {Redirect} from "react-router-dom";
import {FuseUtils} from "@fuse/index";
import {DashboardAppConfig} from "app/main/dashboard/DashboardAppConfig";
import {UsersLoginConfig} from "app/main/login/LoginConfig";
import {LoginConfig} from "app/main/super-login/LoginConfig";
import {RegisterConfig} from "app/main/register/RegisterConfig";
import {Error404PageConfig} from "app/main/errors/Error404PageConfig";


import {DoctorAppConfig} from "app/main/doctors/DoctorAppConfig";
import {PatientAppConfig} from "app/main/patients/PatientAppConfig";



import {LogoutConfig} from "app/main/logout/LogoutConfig";

const routeConfigs = [
    DashboardAppConfig,
    // AirDashboardAppConfig,
    UsersLoginConfig,                  // Used in logout & login
    LoginConfig,
    RegisterConfig,
    // ReadingsAppConfig,
    // AirAppConfig,
    // GraphAppConfig,
    // GraphPredictionAppConfig,
    LogoutConfig,
    // VehicleAppConfig,
    // FleetUserAppConfig,
    DoctorAppConfig,
    PatientAppConfig,
    Error404PageConfig,
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: "/",
        exact: true,
        component: () => <Redirect to="/login"/>,
    },
    {
        path: "/su-admin/",
        exact: true,
        component: () => <Redirect to="/su-admin/login"/>,
    },
    {
        path: "/dashboard/",
        exact: true,
        component: () => <Redirect to="/dashboard"/>,
    },
    {
        component: () => <Redirect to="/404"/>,
    },
];
export default routes;