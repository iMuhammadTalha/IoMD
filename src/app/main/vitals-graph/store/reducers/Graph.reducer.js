/** @format */

import * as Actions from "../actions";

const initialState = {
    routeParams: {},
    created_at: [],
    ecg: [],
    ppg: [],
    ch4Avg: [],
    co2Avg: [],
    dustAvg: [],
    humitidyAvg: [],
    temperatureAvg: [],
    dates: [],
    AQIAvg: []
};

const GraphReducer = function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ALL_GRAPHS: {
            console.log('REDUCER',action.payload);
            return {
                ...state,
                graphdata: action.payload,
                // ppg: action.payload.ppg,
                // created_at: action.payload.created_at
                // ch4Avg: action.payload.ch4Avg,
                // co2Avg: action.payload.co2Avg,
                // dustAvg: action.payload.dustAvg,
                // humitidyAvg: action.payload.humitidyAvg,
                // temperatureAvg: action.payload.temperatureAvg,
                // dates: action.payload.dates,
                // AQIAvg: action.payload.AQIAvg
            };
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
