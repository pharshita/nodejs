import { GET_PROJECT_RESPONSE, GET_STATUS_RESPONSE } from "../Action/statusAction.js"

const initialstate = {
    ProjectList: [],
    StatusIDList: []
}

const statusReducer = (state = initialstate, action) => {
    switch (action.type) {
        case GET_PROJECT_RESPONSE:
            return {
                ...state,
                ProjectList: action.payload
            }
        case GET_STATUS_RESPONSE:
            return {
                ...state,
                StatusIDList: action.payload
            }
        default:
            return state
    }
}

export default statusReducer