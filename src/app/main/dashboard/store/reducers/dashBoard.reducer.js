/** @format */

import * as Actions from "../actions";

const initialState = {

    doctor: 0, 
    patient: 0,
    caretaker: 0,

    sbp: 0,
    dbp: 0,
    body_temperature: 0,
    heart_rate: 0,
    respiration_rate: 0,
    spo2: 0,

    recentAQI: 0,

    created_time: '',
    ch4: 0,
    co: 0,
    dust: 0,
    humidity: 0,
    nh3: 0,
    no2: 0,
    co2: 0,
    temperature: 0,
    
    dateFiltrationOptions: [
        {label: "Today", value: "today"},
        {label: "Yesterday", value: "yesterday"},
        {label: "Last 7 Days", value: "last7Days"},
        {label: "This Month", value: "thisMonth"},
        {label: "Last Month", value: "lastMonth"},
        {label: "Last 3 Months", value: "last3Month"},
        {label: "This Year", value: "thisYear"},
        {label: "Last Year", value: "lastYear"},
    ]
};

const DashboardReducer = function (state = initialState, action) {
    switch (action.type) {
        
        case Actions.GET_RECENT_PATIENT_VITAL: {
console.log(action.payload);
            return {
                ...state,
                sbp: action.payload.sbp,
                dbp: action.payload.dbp,
                heart_rate: action.payload.heart_rate,
                body_temperature: action.payload.body_temperature,
                respiration_rate: action.payload.respiration_rate,
                spo2: action.payload.spo2
            };
        }

        case Actions.GET_TOTAL_DRIVER: {
            return {
                ...state,

                doctor: action.payload
            };
        }

        case Actions.GET_TOTAL_PATIENT: {
            return {
                ...state,

                patient: action.payload
            };
        }
        case Actions.GET_TOTAL_CARETAKER: {
            return {
                ...state,

                caretaker: action.payload
            };
        }
        
        default: {
            return state;
        }
    }
};

export default DashboardReducer;
