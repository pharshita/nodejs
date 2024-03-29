import { GET_RESPONSE } from "../Action/leaveAction"

const initialstate = {
    LeaveList: []
}

const leaveReducer = (state = initialstate, action) => {
    switch (action.type) {
        case GET_RESPONSE:
            return {
                ...state,
                LeaveList: action.payload
            }
        default:
            return state
    }
}

export default leaveReducer