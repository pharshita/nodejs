import { GET_HOLIDAY_RESPONSE, GET_EVENTS_RESPONSE,GET_DASHBOARD_RESPONSE } from '../Action/dashboardAction'
const initialState = {
    holidayList: [],
    eventList: [],
    deshboardList: null
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOLIDAY_RESPONSE:
            return {
                ...state,
                holidayList: action.payload
            }
        case GET_EVENTS_RESPONSE:
            return {
                ...state,
                eventList: action.payload
            }
        case GET_DASHBOARD_RESPONSE:
            return {
                ...state,
                deshboardList: action.payload
            }
        default:
            return state
    }
}

export default dashboardReducer