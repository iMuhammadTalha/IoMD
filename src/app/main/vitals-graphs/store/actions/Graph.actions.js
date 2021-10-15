/** @format */

import axios from "axios";
import { Base_URL } from "../../../../server";
import { showMessage } from "app/store/actions/fuse";
import { authRoles } from "app/auth";
import store from "app/store";
export const GET_ALL_GRAPHS = "[GRAPHS APP] GET GRAPHS";
export const GET_ALL_PATIENTS = "[GRAPHS APP] GET ALL PATIENTS";

let selectedSearch = {
    patient_id: "",
    graph_type: "daily"
};

export function getAllGraphs() {

    return getAllPatients();
}

export const getGraphsData = () => (dispatch) => {
    
    let query;
    

    let role = null;
    role = localStorage.getItem('role');
    
    if(role=== 'admin') {
        if(selectedSearch.graph_type=='daily'){
            query = "vital/get-daily-vitals-graph/" +selectedSearch.patient_id ;
        } else if(selectedSearch.graph_type=='weekly') {
            query = "vital/get-weekly-vitals-graph/" +selectedSearch.patient_id ;
        } else {
            query = "vital/get-daily-vitals-graph/" +selectedSearch.patient_id ;
        }
    } else if(role=== 'doctor') {
        if(selectedSearch.graph_type=='daily'){
            query = "vital/get-daily-vitals-graph/" +selectedSearch.patient_id ;
        } else if(selectedSearch.graph_type=='weekly') {
            query = "vital/get-weekly-vitals-graph/" +selectedSearch.patient_id ;
        } else {
            query = "vital/get-daily-vitals-graph/" +selectedSearch.patient_id ;
        }
    } else if(role=== 'patient') {
        let patient_id = localStorage.getItem('id');
        if(selectedSearch.graph_type=='daily'){
            query = "vital/get-daily-vitals-graph/" + patient_id ;
        } else if(selectedSearch.graph_type=='weekly') {
            query = "vital/get-weekly-vitals-graph/" + patient_id ;
        } else {
            query = "vital/get-daily-vitals-graph/" + patient_id ;
        }
    } else if(role=== 'caretaker') {
        let caretaker_id = localStorage.getItem('id');
        if(selectedSearch.graph_type=='daily'){
            query = "vital/get-daily-vitals-graph-by-caretaker/" + caretaker_id ;
        } else if(selectedSearch.graph_type=='weekly') {
            query = "vital/get-weekly-vitals-graph-by-caretaker/" + caretaker_id ;
        } else {
            query = "vital/get-daily-vitals-graph-by-caretaker/" + caretaker_id ;
        }
    } else {
        if(selectedSearch.graph_type=='daily'){
            query = "vital/get-daily-vitals-graph/" +selectedSearch.patient_id ;
        } else if(selectedSearch.graph_type=='weekly') {
            query = "vital/get-weekly-vitals-graph/" +selectedSearch.patient_id ;
        } else {
            query = "vital/get-daily-vitals-graph/" +selectedSearch.patient_id ;
        }
    }


    
    axios
        .get(Base_URL + query)
        .then((res) => {

            dispatch({
                type: GET_ALL_GRAPHS,
                payload: res.data,
            });

            return {};
        })
        // .then(() => dispatch(getAllPatients()))
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

    if (state.patient_id === "") {
        state.patient_id = selectedSearch.patient_id;
    } 
    if (state.graph_type === "") {
        state.graph_type = selectedSearch.graph_type;
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