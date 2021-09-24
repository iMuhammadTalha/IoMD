import * as Actions from '../actions';
import _ from '@lodash';
import * as authActions from '../../../../auth/store/actions';

const initialState = {
    entities: [],
    searchText: '',
    selectedReadingIds: [],
    routeParams: {},
    readingDialog: {
        type: 'new',
        props: {
            open: false
        },
        data: null
    }
};

const readingsReducer = function (state = initialState, action) {
    switch (action.type) {
        case authActions.LOGOUT: {
            return {
                ...state,
                entities: [],
                searchText: '',
                selectedReadingIds: [],
                routeParams: {},
                readingDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.GET_Readings: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id'),
                pages: (action.pages)
            };
        }
        case Actions.ADD_Reading: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.UPDATE_Reading: {
            return {
                ...state,
                entities: _.keyBy(action.payload, 'id')
            };
        }
        case Actions.REMOVE_Reading: {
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
        case Actions.getReadingsPaginationData: {
            return {
                ...state
            }
        }
        case Actions.TOGGLE_IN_SELECTED_ReadingS: {
            const readingId = action.readingId;

            let selectedReadingIds = [...state.selectedReadingIds];

            if (selectedReadingIds.find(id => id === readingId) !== undefined) {
                selectedReadingIds = selectedReadingIds.filter(id => id !== readingId);
            } else {
                selectedReadingIds = [...selectedReadingIds, readingId];
            }

            return {
                ...state,
                selectedReadingIds: selectedReadingIds
            };
        }
        case Actions.SELECT_ALL_ReadingS: {
            const arr = Object.keys(state.entities).map(k => state.entities[k]);

            const selectedReadingIds = arr.map(reading => reading.id);

            return {
                ...state,
                selectedReadingIds: selectedReadingIds
            };
        }
        case Actions.DESELECT_ALL_ReadingS: {
            return {
                ...state,
                selectedReadingIds: []
            };
        }
        case Actions.OPEN_NEW_Reading_DIALOG: {
            return {
                ...state,
                readingDialog: {
                    type: 'new',
                    props: {
                        open: true
                    },
                    data: null
                }
            };
        }
        case Actions.CLOSE_NEW_Reading_DIALOG: {
            return {
                ...state,
                readingDialog: {
                    type: 'new',
                    props: {
                        open: false
                    },
                    data: null
                }
            };
        }
        case Actions.OPEN_EDIT_Reading_DIALOG: {
            return {
                ...state,
                readingDialog: {
                    type: 'edit',
                    props: {
                        open: true
                    },
                    data: action.data
                }
            };
        }
        case Actions.CLOSE_EDIT_Reading_DIALOG: {
            return {
                ...state,
                readingDialog: {
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

export default readingsReducer;
