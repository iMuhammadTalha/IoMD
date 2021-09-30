/** @format */

import axios from "axios";
import {Base_URL} from "../../../../server";
import {showMessage} from "app/store/actions/fuse";
import store from "app/store";
import {logoutUser} from "app/auth/store/actions/login.actions";

export const GET_Vitals = "[Vitals APP] GET Vitals";
export const ADD_Vital = "[Vitals APP] ADD Vital";
export const UPDATE_Vital = "[Vitals APP] UPDATE Vital";
export const REMOVE_Vital = "[Vitals APP] REMOVE Vital";

export const SET_SEARCH_TEXT = "[VitalS APP] SET SEARCH TEXT";
export const TOGGLE_IN_SELECTED_VitalS =
    "[VitalS APP] TOGGLE IN SELECTED VitalS";
export const SELECT_ALL_VitalS = "[VitalS APP] SELECT ALL VitalS";
export const DESELECT_ALL_VitalS = "[VitalS APP] DESELECT ALL VitalS";
export const OPEN_NEW_Vital_DIALOG = "[VitalS APP] OPEN NEW Vital DIALOG";
export const CLOSE_NEW_Vital_DIALOG =
    "[VitalS APP] CLOSE NEW Vital DIALOG";
export const OPEN_EDIT_Vital_DIALOG =
    "[VitalS APP] OPEN EDIT Vital DIALOG";
export const CLOSE_EDIT_Vital_DIALOG =
    "[VitalS APP] CLOSE EDIT Vital DIALOG";

export const GET_ALL_PATIENTS = "[CARETAKER APP] GET ALL PATIENTS";

export const REMOVE_VitalS = "[VitalS APP] REMOVE VitalS";
export const TOGGLE_STARRED_Vital = "[VitalS APP] TOGGLE STARRED Vital";
export const TOGGLE_STARRED_VitalS = "[VitalS APP] TOGGLE STARRED VitalS";
export const SET_VitalS_STARRED = "[VitalS APP] SET VitalS STARRED ";

let selectedSearch = {
    patient_id: "Undefined"
};

// export function getVitals(routeParams) {
//   const token = localStorage.getItem('jwtToken');

//   const headers = {
//     'Content-Type': 'application/x-www-form-urlencoded',
//     Authorization: token
//   };

//   const request = axios({
//     method: 'get',
//     url: Base_URL+'brand/get-all-brand-users',
//     headers
//   });

export function getVitals() {
    selectedSearch.patient_id="Undefined";
    return getVitalsPaginationData(0, 20, "", "");
}

export const addVital = (newVital) => (dispatch) => {
    axios
        // .post(Base_URL+'vital/create-vital', newVital)
        .post(Base_URL + "vital/create-vital", newVital)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({message: "Vital Created", variant: "success"})
                );
            }
            dispatch({
                type: ADD_Vital,
            });
            dispatch(getVitals());
        })
        .catch((err) => {
            dispatch(
                showMessage({message: err.response.data.error, variant: "error"})
            );
        });
};
export const updateVital = (updateInfo, id) => (dispatch) => {
    axios
        .put(Base_URL + `vital/update-vital/${updateInfo.id}`, updateInfo)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({message: "Vital Updated", variant: "success"})
                );
            }
            dispatch({
                type: UPDATE_Vital,
            });
        })
        .then(() => dispatch(getVitals()))
        .catch((err) => {
            dispatch(
                showMessage({message: err.response.data.error, variant: "error"})
            );

            //   dispatch({
            //     type: LOGIN_ERROR,
            //     payload: err.response.data
            //   });
        });
};
export const removeVital = (id) => (dispatch) => {
    axios
        .delete(Base_URL + `vital/delete-vital/${id}`)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({message: "Vital Removed", variant: "success"})
                );
            }
            dispatch({
                type: REMOVE_Vital,
            });
        })
        .then(() => dispatch(getVitals()))
        .catch((err) => {
            dispatch(
                showMessage({message: err.response.data.error, variant: "error"})
            );
        });
};

// export function updateVital(vital) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().VitalsApp.vitalAppReducer;

//     const request = axios.post(Base_URL+`brand/update-brand/${id}`, {
//       vital
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_Vital
//         })
//       ]).then(() => dispatch(getVitals(routeParams)))
//     );
//   };
// }
// export function addVital(newVital) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().VitalsApp.vitalAppReducer;

//     const request = axios.post(Base_URL+'brand/create-brand-user', {
//       newVital
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_Vital
//         })
//       ]).then(() => dispatch(getVitals(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value,
    };
}

export function toggleInSelectedVitals(vitalId) {
    return {
        type: TOGGLE_IN_SELECTED_VitalS,
        vitalId,
    };
}

export function selectAllVitals() {
    return {
        type: SELECT_ALL_VitalS,
    };
}

export function deSelectAllVitals() {
    return {
        type: DESELECT_ALL_VitalS,
    };
}

export function openNewVitalDialog() {
    return {
        type: OPEN_NEW_Vital_DIALOG,
    };
}

export function closeNewVitalDialog() {
    return {
        type: CLOSE_NEW_Vital_DIALOG,
    };
}

export function openEditVitalDialog(data) {
    return {
        type: OPEN_EDIT_Vital_DIALOG,
        data,
    };
}

export function closeEditVitalDialog() {
    return {
        type: CLOSE_EDIT_Vital_DIALOG,
    };
}

// export function updateVital(vital) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().VitalsApp.vitalAppReducer;

//     const request = axios.post('/api/vitals-app/vital/update-vital', {
//       vital
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_Vital
//         })
//       ]).then(() => dispatch(getVitals(routeParams)))
//     );
//   };
// }

// export function removeVital(vitalId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().VitalsApp.vitalAppReducer;

//     const request = axios.post(Base_URL+`brand/delete-brand/${id}`, {
//       vitalId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_Vital
//         })
//       ]).then(() => dispatch(getVitals(routeParams)))
//     );
//   };
// }

export function removeVitals(vitalIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().VitalsApp.vitalAppReducer;

        const request = axios.post("/api/vitals-app/remove-vitals", {
            vitalIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_VitalS,
                }),
                dispatch({
                    type: DESELECT_ALL_VitalS,
                }),
            ]).then(() => dispatch(getVitals(routeParams)))
        );
    };
}

export function toggleStarredVital(vitalId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().VitalsApp.vitalAppReducer;

        const request = axios.post("/api/vitals-app/toggle-starred-vital", {
            vitalId,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_Vital,
                }),
            ]).then(() => dispatch(getVitals(routeParams)))
        );
    };
}

export function toggleStarredVitals(vitalIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().VitalsApp.vitalAppReducer;

        const request = axios.post("/api/vitals-app/toggle-starred-vitals", {
            vitalIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_VitalS,
                }),
                dispatch({
                    type: DESELECT_ALL_VitalS,
                }),
            ]).then(() => dispatch(getVitals(routeParams)))
        );
    };
}

export function setVitalsStarred(vitalIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().VitalsApp.vitalAppReducer;

        const request = axios.post("/api/vitals-app/set-vitals-starred", {
            vitalIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_VitalS_STARRED,
                }),
                dispatch({
                    type: DESELECT_ALL_VitalS,
                }),
            ]).then(() => dispatch(getVitals(routeParams)))
        );
    };
}

export function setVitalsUnstarred(vitalIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().VitalsApp.vitalAppReducer;

        const request = axios.post("/api/vitals-app/set-vitals-unstarred", {
            vitalIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_VitalS_STARRED,
                }),
                dispatch({
                    type: DESELECT_ALL_VitalS,
                }),
            ]).then(() => dispatch(getVitals(routeParams)))
        );
    };
}

export const getVitalsPaginationData = (
    page,
    pageSize,
    sorted,
    filtered
) => (dispatch) => {
    if (isNaN(pageSize) || pageSize === -1) {
        pageSize = "All";
        page = 0;
        sorted = [];
    }
    let sortingName;
    let sortingOrder;
    if (sorted.length === 0 || sorted === "") {
        sortingName = "Undefined";
        sortingOrder = "Undefined";
    } else {
        if (sorted[0].desc) {
            sortingName = sorted[0].id;
            sortingOrder = "DESC";
        } else {
            sortingName = sorted[0].id;
            sortingOrder = "ASC";
        }
    }
    // let querys =
    //     "vital/get-all-vitals/" +
    //     page +
    //     "/" +
    //     pageSize +
    //     "/" +
    //     sortingName +
    //     "/" +
    //     sortingOrder;


        // let query = "";
        // if(selectedSearch.patient_id=="Undefined"){
        //     query =
        //         "vital/get-all-vitals/" +
        //         page +
        //         "/" +
        //         pageSize +
        //         "/" +
        //         sortingName +
        //         "/" +
        //         sortingOrder;
        // } else {
        //     query = "vital/get-a-patient-all-vitals/" +
        //     selectedSearch.patient_id +
        //     "/" +
        //     page +
        //     "/" +
        //     pageSize +
        //     "/" +
        //     sortingName +
        //     "/" +
        //     sortingOrder;
        // }


        let role = null;
        role = localStorage.getItem('role');
    
        let query;
        if(role=== 'admin') {
            query =
                "vital/get-all-vitals/" +
                page +
                "/" +
                pageSize +
                "/" +
                sortingName +
                "/" +
                sortingOrder;
        } else if(role=== 'doctor' ) {
            let doctor_id = localStorage.getItem('id');
            if(selectedSearch.patient_id=="Undefined"){
                query = "vital/get-a-doctor-all-vitals/" +
                doctor_id +
                "/" +
                page +
                "/" +
                pageSize +
                "/" +
                sortingName +
                "/" +
                sortingOrder;
            } else {
                query = "vital/get-a-patient-all-vitals/" +
                selectedSearch.patient_id +
                "/" +
                page +
                "/" +
                pageSize +
                "/" +
                sortingName +
                "/" +
                sortingOrder;
            }
        } else if(role=== 'patient') {
            let patient_id = localStorage.getItem('id');
            query = "vital/get-a-patient-all-vitals/" +
                patient_id +
                "/" +
                page +
                "/" +
                pageSize +
                "/" +
                sortingName +
                "/" +
                sortingOrder;
        } else {
            query =
                "vital/get-all-vitals/" +
                page +
                "/" +
                pageSize +
                "/" +
                sortingName +
                "/" +
                sortingOrder;
        }


    console.log("vitals get api",selectedSearch.patient_id, query);
    axios
        .get(Base_URL + query)
        .then((res) => {
            // console.log("vitals get after calling", res);
            dispatch({
                type: GET_Vitals,
                payload: res.data.records,
                pages: res.data.pages,
                selected_patient_id: selectedSearch.patient_id
            });
            return {};
        })
        .then(() => dispatch(getAllPatients()))
        .catch((err) => {
            console.log("err", err);
            if (err.request.status === 401) {
                dispatch(
                    showMessage({
                        message: "Your session expired. Please login again.",
                        variant: "error",
                    })
                );
                store.dispatch(logoutUser());
            }
        });
};

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

export function searchVital(state) {
    if (state.patient_id === "") {
        state.patient_id = "Undefined";
    }
    
    selectedSearch = state;

    return getVitalsPaginationData(0, 20, "", "");
}