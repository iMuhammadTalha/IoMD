import {combineReducers} from 'redux';
import readings from './reading.reducer';

const reducer = combineReducers({
    readings
});

export default reducer;
