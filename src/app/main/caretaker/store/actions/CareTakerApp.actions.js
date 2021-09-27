/** @format */

import axios from "axios";
import { Base_URL } from "../../../../server";
import { showMessage } from "app/store/actions/fuse";

export const GET_ALL_CARETAKERS = "[CARETAKER APP] GET ALL CARETAKER";
export const OPEN_NEW_CARETAKER_DIALOG = "[CARETAKER APP] OPEN NEW CARETAKER DIALOG";
export const CLOSE_NEW_CARETAKER_DIALOG =
    "[CARETAKER APP] CLOSE NEW CARETAKER DIALOG";
export const OPEN_EDIT_CARETAKER_DIALOG =
    "[CARETAKER APP] OPEN EDIT CARETAKER DIALOG";
export const CLOSE_EDIT_CARETAKER_DIALOG =
    "[CARETAKER APP] CLOSE EDIT CARETAKER DIALOG";
export const GET_ALL_PATIENTS = "[CARETAKER APP] GET ALL PATIENTS";

export function getAllCareTakers() {
    return getCareTakersPaginationData();
}

export const addNewCareTaker = (newCareTaker) => (dispatch) => {

console.log("CT",newCareTaker);

    axios
        .post(Base_URL + "user/careTaker/create-careTaker", newCareTaker)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "New careTaker added successfully...",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllCareTakers());
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Error adding new careTaker.",
                    variant: "error"
                })
            );
        });
};

export const updateCareTakers = (updateInfo) => (dispatch) => {
    axios
        .put(Base_URL + `user/careTaker/update-careTaker/` + updateInfo.id, updateInfo)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "CareTaker Data Updated.",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllCareTakers());
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Something Went Wrong.",
                    variant: "error"
                })
            );
        });
};

export const removeCareTaker = (id) => (dispatch) => {
    axios
        .delete(Base_URL + "user/careTaker/delete-careTaker/" + id)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "CareTaker Removed Successfully.",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllCareTakers());
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

export const getCareTakersPaginationData = () => (dispatch) => {
    let query = "user/careTaker/get-all-careTaker";

    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_ALL_CARETAKERS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

export const getAllPatients = () => (dispatch) => {
    let query = "user/patient/get-all-patients";

    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_ALL_PATIENTS,
                payload: res.data
            });
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};

export function openNewCareTakerDialog() {
    return {
        type: OPEN_NEW_CARETAKER_DIALOG
    };
}

export function closeNewCareTakerDialog() {
    return {
        type: CLOSE_NEW_CARETAKER_DIALOG
    };
}

export function openEditCareTakerDialog(data) {
    return {
        type: OPEN_EDIT_CARETAKER_DIALOG,
        data
    };
}

export function closeEditCareTakerDialog() {
    return {
        type: CLOSE_EDIT_CARETAKER_DIALOG
    };
}
