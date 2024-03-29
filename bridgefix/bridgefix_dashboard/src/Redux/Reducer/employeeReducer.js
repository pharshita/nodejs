import { USER_LIST_RESPONSE, EMPLOYEE_LIST_RESPONSE } from "../Action/employeeAction"

const initialstate = {
    userList: [],
    employeeList:[]
}

const employeeReducer = (state = initialstate, action) => {
    switch (action.type) {
        case USER_LIST_RESPONSE:
            return {
                ...state,
                userList: action.payload
            }
        case EMPLOYEE_LIST_RESPONSE:
            return {
                ...state,
                employeeList: action.payload
            }
        default:
            return state
    }
}

export default employeeReducer