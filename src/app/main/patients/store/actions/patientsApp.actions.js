/** @format */

import axios from "axios";
import { Base_URL } from "../../../../server";
import { showMessage } from "app/store/actions/fuse";

export const GET_ALL_PATIENTS = "[PATIENT APP] GET ALL PATIENT";
export const OPEN_NEW_PATIENT_DIALOG = "[PATIENT APP] OPEN NEW PATIENT DIALOG";
export const CLOSE_NEW_PATIENT_DIALOG =
    "[PATIENT APP] CLOSE NEW PATIENT DIALOG";
export const OPEN_EDIT_PATIENT_DIALOG =
    "[PATIENT APP] OPEN EDIT PATIENT DIALOG";
export const CLOSE_EDIT_PATIENT_DIALOG =
    "[PATIENT APP] CLOSE EDIT PATIENT DIALOG";
export const GET_ALL_DOCTORS = "[PATIENT APP] GET ALL DOCTORS";

export function getAllPatients() {
    return getPatientsPaginationData();
}

export const addNewPatient = (newPatient) => (dispatch) => {

// console.log(newPatient);

    axios
        .post(Base_URL + "user/patient/create-patient", newPatient)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "New patient added successfully...",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllPatients());
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Error adding new patient.",
                    variant: "error"
                })
            );
        });
};

export const updatePatients = (updateInfo) => (dispatch) => {
    axios
        .put(Base_URL + `user/patient/update-patient/` + updateInfo.id, updateInfo)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "Patient Data Updated.",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllPatients());
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

export const removePatient = (id) => (dispatch) => {
    axios
        .delete(Base_URL + "user/patient/delete-patient/" + id)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({
                        message: "Patient Removed Successfully.",
                        variant: "success"
                    })
                );
            }
            dispatch(getAllPatients());
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

export const getPatientsPaginationData = () => (dispatch) => {

    let role = null;
    role = localStorage.getItem('Role');

    let query;
    if(role=== 'admin' ) {
        query = "user/patient/get-all-patients";
    } else if(role=== 'doctor' ) {
        let doctor_id = localStorage.getItem('id');
        query = "user/patient/get-doctor-all-patients/" + doctor_id;
    } else {
        query = "user/patient/get-all-patients";
    }

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

export const getAllDoctors = () => (dispatch) => {
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

export function openNewPatientDialog() {
    return {
        type: OPEN_NEW_PATIENT_DIALOG
    };
}

export function closeNewPatientDialog() {
    return {
        type: CLOSE_NEW_PATIENT_DIALOG
    };
}

export function openEditPatientDialog(data) {
    return {
        type: OPEN_EDIT_PATIENT_DIALOG,
        data
    };
}

export function closeEditPatientDialog() {
    return {
        type: CLOSE_EDIT_PATIENT_DIALOG
    };
}
