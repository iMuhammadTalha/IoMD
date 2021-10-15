/** @format */

import axios from "axios";
import setAuthToken from "../setAuthToken";
import jwt_decode from "jwt-decode";
import {Base_URL} from "../../../server";

import { showMessage } from "app/store/actions/fuse";

export const GET_ERRORS = "GET_ERRORS";
export const SET_CURRENT_USER = "SET_CURRENT_USER";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
    axios
        // .post(Base_URL+'su-admin/login', userData)
        .post(Base_URL + "user/auth/admin-login", userData)
        .then((res) => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            localStorage.setItem("id", decoded.id);
            const userInfo = {
                ...decoded,
                // companyId: 1, //res.data.companyId,
                // brandId: 1//res.data.brandId,
            };
            // Set current user
            dispatch(setCurrentUser(userInfo));
        })
        .catch((err) => {
            console.log(err);

            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });

            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );


        });
};

export const loginAdminUser = (userData) => (dispatch) => {
    axios
        .post(Base_URL + "user/auth/admin-login", userData)
        .then((res) => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("role", decoded.role);
            const userInfo = {
                ...decoded,
                // id: res.data.id,
                // role: res.data.role
            };
            // Set current user
            dispatch(setCurrentUser(userInfo));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

export const loginDoctorUser = (userData) => (dispatch) => {
    axios
        .post(Base_URL + "user/auth/doctor-login", userData)
        .then((res) => {
            // Save to localStorage

            console.log(res);

            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            localStorage.setItem("id", res.data.id);
            localStorage.setItem("role", res.data.role);
            const userInfo = {
                ...decoded,
                // id: res.data.id,
                // role: res.data.role
            };
            console.log('USER',userInfo);
            // Set current user
            dispatch(setCurrentUser(userInfo));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

export const loginPatientUser = (userData) => (dispatch) => {
    axios
        .post(Base_URL + "user/auth/patient-login", userData)
        .then((res) => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("role", decoded.role);
            const userInfo = {
                ...decoded,
                // id: res.data.id,
                // role: res.data.role
            };
            // Set current user
            dispatch(setCurrentUser(userInfo));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

export const loginCareTakerUser = (userData) => (dispatch) => {
    axios
        .post(Base_URL + "user/auth/caretaker-login", userData)
        .then((res) => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);
            localStorage.setItem("id", decoded.id);
            localStorage.setItem("role", decoded.role);
            const userInfo = {
                ...decoded,
                // id: res.data.id,
                // role: res.data.role
            };
            // Set current user
            dispatch(setCurrentUser(userInfo));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

// Login - Get User Token
export const loginBrandUser = (userData) => (dispatch) => {
    axios
        // .post(Base_URL+'admin-auth/login', userData)
        .post(Base_URL + "user/auth/admin-login", userData)
        .then((res) => {
            // Save to localStorage
            const {token} = res.data;
            // Set token to ls
            localStorage.setItem("jwtToken", token);
            // localStorage.setItem("companyId", res.data.companyId);
            // localStorage.setItem("brandId", res.data.brandId);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decoded = jwt_decode(token);

            const userInfo = {
                ...decoded,
                // companyId: res.data.companyId,
                // brandId: res.data.brandId,
            };
            // Set current user
            dispatch(setCurrentUser(userInfo));
        })
        .catch((err) => {
            console.log(err);
            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });
        });
};

// Set logged in user
export const verifyToken = (token) => (dispatch) => {
    axios
        // .post(Base_URL+'admin-auth/verify-token', { token })
        .post(Base_URL + "user/auth/admin-login", {token})
        .then((res) => {
            // Set current user
            dispatch(setCurrentUser(res.data));
        })
        .catch((err) => {
            console.log('CATCH',err);

            dispatch({
                type: LOGIN_ERROR,
                payload: err.response.data,
            });
        });
};
export const setCurrentUser = (decoded) => {
    console.log('DDD',decoded);
    return {
        type: SET_CURRENT_USER,
        payload: decoded,
    };
};

// Log user out
export const logoutUser = () => (dispatch) => {
    // Remove token from localStorage
    localStorage.removeItem("jwtToken");
    localStorage.removeItem('Role');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
    dispatch({
        type: LOGOUT,
    });
};
