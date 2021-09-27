/** @format */

import * as Actions from "../actions";

const initialState = {
    entities: [],
    patients: [],
    careTakerDialog: {
        type: "new",
        props: {
            open: false
        },
        data: null
    }
};

const CareTakerAppReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_CARETAKERS: {
            return {
                ...state,
                entities: action.payload
            };
        }
        case Actions.GET_ALL_PATIENTS: {
            return {
                ...state,
                patients: action.payload
            };
        }
        case Actions.OPEN_NEW_CARETAKER_DIALOG: {
            return {
                ...state,
                careTakerDialog: {
                    type: "new",
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_CARETAKER_DIALOG: {
            return {
                ...state,
                careTakerDialog: {
                    type: "new",
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_CARETAKER_DIALOG: {
            return {
                ...state,
                careTakerDialog: {
                    type: "edit",
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_CARETAKER_DIALOG: {
            return {
                ...state,
                careTakerDialog: {
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

export default CareTakerAppReducer;
