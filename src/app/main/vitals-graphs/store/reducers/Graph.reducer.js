/** @format */

import * as Actions from "../actions";

const initialState = {
    routeParams: {},
    created_at: [],
    heartRateAvg: [],
    bodyTemperatureAvg: [],
    sbpAvg: [],
    dbpAvg: [],
    spo2Avg: [],
    respirationRateAvg: [],
    date:'',
    time: []
};

const GraphReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_GRAPHS: {
            // console.log('REDUCER',action.payload);
            return {
                ...state,
                heartRateAvg: action.payload.heartRateAvg,
                bodyTemperatureAvg: action.payload.bodyTemperatureAvg,
                sbpAvg: action.payload.sbpAvg,
                dbpAvg: action.payload.dbpAvg,
                spo2Avg: action.payload.spo2Avg,
                respirationRateAvg: action.payload.respirationRateAvg,
                date: action.payload.date,
                time: action.payload.time
            };
        }
        case Actions.getGraphsData: {
            return {
                ...state
            }
        }
        case Actions.GET_ALL_PATIENTS: {
            return {
                ...state,
                patients: action.payload
            };
        }
        default: {
            return state;
        }
    }
};

export default GraphReducer;
