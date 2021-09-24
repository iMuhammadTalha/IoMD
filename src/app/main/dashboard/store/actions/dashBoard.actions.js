/** @format */

import axios from "axios";
import {Base_URL} from "../../../../server";
import {showMessage} from "app/store/actions/fuse";

export const GET_RECENT_AQI = "[DASHBOARD APP] GET RECENT AQI";
export const GET_A_RECENT_READING = "[DASHBOARD APP] GET RECENT READING";

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

export const getARecentReading = (query) => (dispatch) => {
    
    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_A_RECENT_READING,
                payload: res.data
            });
        })
        .then(() => dispatch(updateAQI()))
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Unable to get recent reading...",
                    variant: "error"
                })
            );
        });
};

export function updateAQI() {
    return getRecentAQI();
}