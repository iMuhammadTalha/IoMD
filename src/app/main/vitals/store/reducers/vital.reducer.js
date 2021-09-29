import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
    entities: [],
    patients: [],
    selected_patient_id: "Undefined",

    searchText: '',
    selectedVitalIds: [],
    routeParams: {},
    VitalDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const vitalsReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                searchText: '',
                selectedVitalIds: [],
                routeParams: {},
                VitalDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_ALL_PATIENTS: {
            return {
                ...state,
                patients: action.payload
            };
        }

        case Actions.GET_Vitals: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages),
                selected_patient_id: (action.selected_patient_id)
            };
        }
        case Actions.ADD_Vital: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_Vital: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_Vital: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.SET_SEARCH_TEXT: {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        case Actions.getVitalsPaginationData: {
            return {
                ...state
            }
        }
        case Actions.TOGGLE_IN_SELECTED_VitalS: {
            const vitalId = action.vitalId;

            let selectedVitalIds = [...state.selectedVitalIds];

            if (selectedVitalIds.find(id => id === vitalId) !== undefined) {
                selectedVitalIds = selectedVitalIds.filter(id => id !== vitalId);
            } else {
                selectedVitalIds = [...selectedVitalIds, vitalId];
            }

            return {
                ...state,
                selectedVitalIds: selectedVitalIds
            };
        }
        case Actions.SELECT_ALL_VitalS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedVitalIds = arr.map(vital => vital.id);

            return {
                ...state,
                selectedVitalIds: selectedVitalIds
            };
        }
        case Actions.DESELECT_ALL_VitalS: {
            return {
                ...state,
                selectedVitalIds: []
            };
        }
        case Actions.OPEN_NEW_Vital_DIALOG: {
            return {
                ...state,
                VitalDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_Vital_DIALOG: {
            return {
                ...state,
                VitalDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_Vital_DIALOG: {
            return {
                ...state,
                VitalDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_Vital_DIALOG: {
            return {
                ...state,
                VitalDialog: {
                    type: 'edit',
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

export default vitalsReducer;
