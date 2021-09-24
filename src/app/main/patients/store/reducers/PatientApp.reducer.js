/** @format */

import * as Actions from "../actions";

const initialState = {
    entities: [],
    doctors: [],
    patientDialog: {
        type: "new",
        props: {
            open: false
        },
        data: null
    }
};

const PatientAppReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_PATIENTS: {
            return {
                ...state,
                entities: action.payload
            };
        }
        case Actions.GET_ALL_DOCTORS: {
            return {
                ...state,
                doctors: action.payload
            };
        }
        case Actions.OPEN_NEW_PATIENT_DIALOG: {
            return {
                ...state,
                patientDialog: {
                    type: "new",
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_PATIENT_DIALOG: {
            return {
                ...state,
                patientDialog: {
                    type: "new",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_PATIENT_DIALOG: {
            return {
                ...state,
                patientDialog: {
                    type: "edit",
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_PATIENT_DIALOG: {
            return {
                ...state,
                patientDialog: {
                    type: "edit",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        default: {
            return state;
        }
    }
};

export default PatientAppReducer;
