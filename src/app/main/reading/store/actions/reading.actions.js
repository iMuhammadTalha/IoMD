/** @format */

import axios from "axios";
import {Base_URL} from "../../../../server";
import {showMessage} from "app/store/actions/fuse";
import store from "app/store";
import {logoutUser} from "app/auth/store/actions/login.actions";

export const GET_Readings = "[Readings APP] GET Readings";
export const ADD_Reading = "[Readings APP] ADD Reading";
export const UPDATE_Reading = "[Readings APP] UPDATE Reading";
export const REMOVE_Reading = "[Readings APP] REMOVE Reading";

export const SET_SEARCH_TEXT = "[ReadingS APP] SET SEARCH TEXT";
export const TOGGLE_IN_SELECTED_ReadingS =
    "[ReadingS APP] TOGGLE IN SELECTED ReadingS";
export const SELECT_ALL_ReadingS = "[ReadingS APP] SELECT ALL ReadingS";
export const DESELECT_ALL_ReadingS = "[ReadingS APP] DESELECT ALL ReadingS";
export const OPEN_NEW_Reading_DIALOG = "[ReadingS APP] OPEN NEW Reading DIALOG";
export const CLOSE_NEW_Reading_DIALOG =
    "[ReadingS APP] CLOSE NEW Reading DIALOG";
export const OPEN_EDIT_Reading_DIALOG =
    "[ReadingS APP] OPEN EDIT Reading DIALOG";
export const CLOSE_EDIT_Reading_DIALOG =
    "[ReadingS APP] CLOSE EDIT Reading DIALOG";

export const REMOVE_ReadingS = "[ReadingS APP] REMOVE ReadingS";
export const TOGGLE_STARRED_Reading = "[ReadingS APP] TOGGLE STARRED Reading";
export const TOGGLE_STARRED_ReadingS = "[ReadingS APP] TOGGLE STARRED ReadingS";
export const SET_ReadingS_STARRED = "[ReadingS APP] SET ReadingS STARRED ";

// export function getReadings(routeParams) {
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

export function getReadings() {
    return getReadingsPaginationData(0, 20, "", "");
}

export const addReading = (newReading) => (dispatch) => {
    axios
        // .post(Base_URL+'reading/create-reading', newReading)
        .post(Base_URL + "reading/create-reading", newReading)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({message: "Reading Created", variant: "success"})
                );
            }
            dispatch({
                type: ADD_Reading,
            });
            dispatch(getReadings());
        })
        .catch((err) => {
            dispatch(
                showMessage({message: err.response.data.error, variant: "error"})
            );
        });
};
export const updateReading = (updateInfo, id) => (dispatch) => {
    axios
        .put(Base_URL + `reading/update-reading/${updateInfo.id}`, updateInfo)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({message: "Reading Updated", variant: "success"})
                );
            }
            dispatch({
                type: UPDATE_Reading,
            });
        })
        .then(() => dispatch(getReadings()))
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
export const removeReading = (id) => (dispatch) => {
    axios
        .delete(Base_URL + `reading/delete-reading/${id}`)
        .then((res) => {
            if (res.request.status === 200) {
                dispatch(
                    showMessage({message: "Reading Removed", variant: "success"})
                );
            }
            dispatch({
                type: REMOVE_Reading,
            });
        })
        .then(() => dispatch(getReadings()))
        .catch((err) => {
            dispatch(
                showMessage({message: err.response.data.error, variant: "error"})
            );
        });
};

// export function updateReading(reading) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().readingsApp.readings;

//     const request = axios.post(Base_URL+`brand/update-brand/${id}`, {
//       reading
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_Reading
//         })
//       ]).then(() => dispatch(getReadings(routeParams)))
//     );
//   };
// }
// export function addReading(newReading) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().readingsApp.readings;

//     const request = axios.post(Base_URL+'brand/create-brand-user', {
//       newReading
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: ADD_Reading
//         })
//       ]).then(() => dispatch(getReadings(routeParams)))
//     );
//   };
// }

export function setSearchText(event) {
    return {
        type: SET_SEARCH_TEXT,
        searchText: event.target.value,
    };
}

export function toggleInSelectedReadings(readingId) {
    return {
        type: TOGGLE_IN_SELECTED_ReadingS,
        readingId,
    };
}

export function selectAllReadings() {
    return {
        type: SELECT_ALL_ReadingS,
    };
}

export function deSelectAllReadings() {
    return {
        type: DESELECT_ALL_ReadingS,
    };
}

export function openNewReadingDialog() {
    return {
        type: OPEN_NEW_Reading_DIALOG,
    };
}

export function closeNewReadingDialog() {
    return {
        type: CLOSE_NEW_Reading_DIALOG,
    };
}

export function openEditReadingDialog(data) {
    return {
        type: OPEN_EDIT_Reading_DIALOG,
        data,
    };
}

export function closeEditReadingDialog() {
    return {
        type: CLOSE_EDIT_Reading_DIALOG,
    };
}

// export function updateReading(reading) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().readingsApp.readings;

//     const request = axios.post('/api/readings-app/reading/update-reading', {
//       reading
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: UPDATE_Reading
//         })
//       ]).then(() => dispatch(getReadings(routeParams)))
//     );
//   };
// }

// export function removeReading(readingId) {
//   return (dispatch, getState) => {
//     const { routeParams } = getState().readingsApp.readings;

//     const request = axios.post(Base_URL+`brand/delete-brand/${id}`, {
//       readingId
//     });

//     return request.then(response =>
//       Promise.all([
//         dispatch({
//           type: REMOVE_Reading
//         })
//       ]).then(() => dispatch(getReadings(routeParams)))
//     );
//   };
// }

export function removeReadings(readingIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().readingsApp.readings;

        const request = axios.post("/api/readings-app/remove-readings", {
            readingIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: REMOVE_ReadingS,
                }),
                dispatch({
                    type: DESELECT_ALL_ReadingS,
                }),
            ]).then(() => dispatch(getReadings(routeParams)))
        );
    };
}

export function toggleStarredReading(readingId) {
    return (dispatch, getState) => {
        const {routeParams} = getState().readingsApp.readings;

        const request = axios.post("/api/readings-app/toggle-starred-reading", {
            readingId,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_Reading,
                }),
            ]).then(() => dispatch(getReadings(routeParams)))
        );
    };
}

export function toggleStarredReadings(readingIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().readingsApp.readings;

        const request = axios.post("/api/readings-app/toggle-starred-readings", {
            readingIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: TOGGLE_STARRED_ReadingS,
                }),
                dispatch({
                    type: DESELECT_ALL_ReadingS,
                }),
            ]).then(() => dispatch(getReadings(routeParams)))
        );
    };
}

export function setReadingsStarred(readingIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().readingsApp.readings;

        const request = axios.post("/api/readings-app/set-readings-starred", {
            readingIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_ReadingS_STARRED,
                }),
                dispatch({
                    type: DESELECT_ALL_ReadingS,
                }),
            ]).then(() => dispatch(getReadings(routeParams)))
        );
    };
}

export function setReadingsUnstarred(readingIds) {
    return (dispatch, getState) => {
        const {routeParams} = getState().readingsApp.readings;

        const request = axios.post("/api/readings-app/set-readings-unstarred", {
            readingIds,
        });

        return request.then((response) =>
            Promise.all([
                dispatch({
                    type: SET_ReadingS_STARRED,
                }),
                dispatch({
                    type: DESELECT_ALL_ReadingS,
                }),
            ]).then(() => dispatch(getReadings(routeParams)))
        );
    };
}

export const getReadingsPaginationData = (
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
    let querys =
        "air/get-all-readings/" +
        page +
        "/" +
        pageSize +
        "/" +
        sortingName +
        "/" +
        sortingOrder;
    console.log("readings get api", querys);
    axios
        .get(Base_URL + querys)
        .then((res) => {
            // console.log("readings get after calling", res);
            dispatch({
                type: GET_Readings,
                payload: res.data.records,
                pages: res.data.pages,
            });
            return {};
        })
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
