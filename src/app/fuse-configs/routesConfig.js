/** @format */

import React from "react";
import {Redirect} from "react-router-dom";
import {FuseUtils} from "@fuse/index";
import {DashboardAppConfig} from "app/main/dashboard/DashboardAppConfig";
import {UsersLoginConfig} from "app/main/login/LoginConfig";
import {LoginConfig} from "app/main/super-login/LoginConfig";

import {AdminLoginConfig} from "app/main/login-admin/LoginConfig";
import {CareTakerLoginConfig} from "app/main/login-caretaker/LoginConfig";
import {DoctorLoginConfig} from "app/main/login-doctor/LoginConfig";
import {PatientLoginConfig} from "app/main/login-patient/LoginConfig";

import {RegisterConfig} from "app/main/register/RegisterConfig";
import {Error404PageConfig} from "app/main/errors/Error404PageConfig";


import {DoctorAppConfig} from "app/main/doctors/DoctorAppConfig";
import {PatientAppConfig} from "app/main/patients/PatientAppConfig";

import {CareTakerAppConfig} from "app/main/caretaker/CareTakerAppConfig";


import {LogoutConfig} from "app/main/logout/LogoutConfig";

const routeConfigs = [
    DashboardAppConfig,
    // AirDashboardAppConfig,
    UsersLoginConfig,                  // Used in logout & login
    LoginConfig,
    RegisterConfig,

    AdminLoginConfig,
    CareTakerLoginConfig,
    DoctorLoginConfig,
    PatientLoginConfig,

    // ReadingsAppConfig,
    // AirAppConfig,
    // GraphAppConfig,
    // GraphPredictionAppConfig,
    LogoutConfig,
    // VehicleAppConfig,
    // FleetUserAppConfig,
    DoctorAppConfig,
    PatientAppConfig,
    CareTakerAppConfig,
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
        path: "/admin/",
        exact: true,
        component: () => <Redirect to="/admin/login"/>,
    },
    {
        path: "/doctor/",
        exact: true,
        component: () => <Redirect to="/doctor/login"/>,
    },
    {
        path: "/patient/",
        exact: true,
        component: () => <Redirect to="/patient/login"/>,
    },
    {
        path: "/caretaker/",
        exact: true,
        component: () => <Redirect to="/caretaker/login"/>,
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
