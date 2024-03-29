import { combineReducers } from 'redux';
import loginReducer from '../Reducer/loginReducer';
import dashboardReducer from '../Reducer/dashboardReducer';
import employeeReducer from '../Reducer/employeeReducer';
import leaveReducer from '../Reducer/leaveReducer';
import statusReducer from '../Reducer/statusReducer';

export default combineReducers({
    loginReducer,
    dashboardReducer,
    employeeReducer,
    leaveReducer,
    statusReducer,
})