/** @format */

import axios from "axios";
import { Base_URL } from "../../../../server";
import { showMessage } from "app/store/actions/fuse";
import { authRoles } from "app/auth";
import store from "app/store";
export const GET_ALL_GRAPHS = "[GRAPHS APP] GET GRAPHS";
export const GET_ALL_PATIENTS = "[GRAPHS APP] GET ALL PATIENTS";

let selectedSearch = {
    patient_id: 1
};

export function getAllGraphs() {
    return getAllPatients();
 
}

export const getGraphsData = () => (dispatch) => {
    
    
    let query = "vital/get-a-patient-latest-ecg-vital/" +selectedSearch.patient_id ;
    
    
    axios
        .get(Base_URL + query)
        .then((res) => {
            console.log('RESPONSE',res.data);
            dispatch({
                type: GET_ALL_GRAPHS,
                payload: res.data.ECG,
            });

            return {};
        })
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Unable to get graphs...",
                    variant: "error"
                })
            );
        });
};


export function searchReading(state) {
    if (state.nodeId === "") {
        state.nodeId = 1;
    }
    
    selectedSearch = state;

    return getGraphsData();
}

export const getAllPatients = () => (dispatch) => {
    
    let role = null;
    role = localStorage.getItem('role');

    let query;
    if(role=== 'admin' ) {
        query = "user/patient/get-all-patients";
    } else if(role=== 'doctor' ) {
        let doctor_id = localStorage.getItem('id');
        query = "user/patient/get-doctor-all-patients/" + doctor_id;
    } else {
        query = "user/patient/get-all-patients";
    }
    
    
    // let query = "user/patient/get-all-patients";

    axios
        .get(Base_URL + query)
        .then((res) => {
            console.log('PATIENT ID',res.data[0].id);
            if(res.data[0] && selectedSearch.patient_id==""){
                selectedSearch.patient_id=res.data[0].id;
            }
            dispatch({
                type: GET_ALL_PATIENTS,
                payload: res.data
            });
        })
        .then(() => dispatch(getGraphsData()))
        .catch((err) => {
            dispatch(
                showMessage({
                    message: "Something Went Wrong",
                    variant: "error"
                })
            );
        });
};