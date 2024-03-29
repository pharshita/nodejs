import { GET_HOLIDAY_RESPONSE ,POST_HOLIDAY_RESPONSE} from '../Action/dashboardAction'
const initialState = {
    holidayList: [],
    postHoliday: false,
}

const holidayReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_HOLIDAY_RESPONSE:
            return {
                ...state,
                holidayList: action.payload
            }
        case POST_HOLIDAY_RESPONSE:
            return {
                ...state,
                postHoliday: action.payload
            }
        default:
            return state
    }
}

export default holidayReducer