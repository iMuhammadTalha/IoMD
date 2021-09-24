/** @format */

import * as Actions from "../actions";

const initialState = {
    entities: [],
    services: [],
    doctorDialog: {
        type: "new",
        props: {
            open: false
        },
        data: null
    }
};

const DoctorAppReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_DOCTORS: {
            return {
                ...state,
                entities: action.payload
            };
        }
        case Actions.GET_ALL_SERVICES: {
            return {
                ...state,
                services: action.payload
            };
        }
        case Actions.OPEN_NEW_DOCTOR_DIALOG: {
            return {
                ...state,
                doctorDialog: {
                    type: "new",
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_DOCTOR_DIALOG: {
            return {
                ...state,
                doctorDialog: {
                    type: "new",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_DOCTOR_DIALOG: {
            return {
                ...state,
                doctorDialog: {
                    type: "edit",
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_DOCTOR_DIALOG: {
            return {
                ...state,
                doctorDialog: {
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

export default DoctorAppReducer;
