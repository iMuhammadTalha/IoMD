/** @format */

import axios from "axios";
import { Base_URL } from "../../../../server";
import { showMessage } from "app/store/actions/fuse";

export const GET_ALL_DOCTORS = "[DOCTOR APP] GET ALL DOCTOR";
export const OPEN_NEW_DOCTOR_DIALOG = "[DOCTOR APP] OPEN NEW DOCTOR DIALOG";
export const CLOSE_NEW_DOCTOR_DIALOG =
    "[DOCTOR APP] CLOSE NEW DOCTOR DIALOG";
export const OPEN_EDIT_DOCTOR_DIALOG =
    "[DOCTOR APP] OPEN EDIT DOCTOR DIALOG";
export const CLOSE_EDIT_DOCTOR_DIALOG =
    "[DOCTOR APP] CLOSE EDIT DOCTOR DIALOG";
export const GET_ALL_SERVICES = "[DOCTOR APP] GET ALL SERVICES";

export function getAllDoctors() {
    return getDoctorsPaginationData();
}

export const addNewDoctor = (newDoctor) => (dispatch) => {

// console.log(newDoctor);

    axios
        .post(Base_URL + "user/doctor/create-doctor", newDoctor)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "New doctor added successfully...",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllDoctors());
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Error adding new doctor.",
                    variant: "error"
                })
            );
        });
};

export const updateDoctors = (updateInfo) => (dispatch) => {
    axios
        .put(Base_URL + `user/doctor/update-doctor/` + updateInfo.id, updateInfo)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "Doctor Data Updated.",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllDoctors());
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

export const removeDoctor = (id) => (dispatch) => {
    axios
        .delete(Base_URL + "doctors/delete-doctor/" + id)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "Doctor Removed Successfully.",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllDoctors());
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

export const getDoctorsPaginationData = () => (dispatch) => {
    let query = "user/doctor/get-all-doctors";

    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_ALL_DOCTORS,
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

export const getAllServices = () => (dispatch) => {
    let query = "services/get-all-services";

    axios
        .get(Base_URL + query)
        .then((res) => {
            dispatch({
                type: GET_ALL_SERVICES,
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

export function openNewDoctorDialog() {
    return {
        type: OPEN_NEW_DOCTOR_DIALOG
    };
}

export function closeNewDoctorDialog() {
    return {
        type: CLOSE_NEW_DOCTOR_DIALOG
    };
}

export function openEditDoctorDialog(data) {
    return {
        type: OPEN_EDIT_DOCTOR_DIALOG,
        data
    };
}

export function closeEditDoctorDialog() {
    return {
        type: CLOSE_EDIT_DOCTOR_DIALOG
    };
}
