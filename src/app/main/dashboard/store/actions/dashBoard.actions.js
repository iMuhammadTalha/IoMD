/** @format */

import axios from "axios";
import {Base_URL} from "../../../../server";
import {showMessage} from "app/store/actions/fuse";

export const GET_RECENT_AQI = "[DASHBOARD APP] GET RECENT AQI";
export const GET_TOTAL_DRIVER = "[DASHBOARD APP] GET TOTAL DOCTORS";
export const GET_TOTAL_PATIENT = "[DASHBOARD APP] GET TOTAL PATIENTS";
export const GET_TOTAL_CARETAKER = "[DASHBOARD APP] GET TOTAL CARETAKERS";

export const getRecentAQI = () => (dispatch) => {
    const query = "air/get-AQI/1";

    axios
        .get(Base_URL + query)
        .then((res) => {
            console.log(res.data.aqi);
            dispatch({
                type: GET_RECENT_AQI,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Unable to get recent aqi...",
                    variant: "error"
                })
            );
        });
};

export const getTotalDoctor = (query) => (dispatch) => {
    
    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_TOTAL_DRIVER,
                payload: res.data.totalDoctors
            });
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Unable to get recent doctor...",
                    variant: "error"
                })
            );
        });
};

export const getTotalPatient = (query) => (dispatch) => {
    
    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_TOTAL_PATIENT,
                payload: res.data.totalPatients
            });
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Unable to get recent patient...",
                    variant: "error"
                })
            );
        });
};

export const getTotalCareTaker = (query) => (dispatch) => {
    
    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_TOTAL_CARETAKER,
                payload: res.data.totalCareTakers
            });
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Unable to get recent caretaker...",
                    variant: "error"
                })
            );
        });
};

export function updateAQI() {
    return getRecentAQI();
}