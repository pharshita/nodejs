import axios from "axios"
import swal from 'sweetalert';
export const GET_HOLIDAY_RESPONSE = "GET_HOLIDAY_RESPONSE"
export const GET_EVENTS_RESPONSE = "GET_EVENTS_RESPONSE"
export const GET_DASHBOARD_RESPONSE = "GET_DASHBOARD_RESPONSE"

export const getHolidayResponse = (data) => {
    return {
        type: GET_HOLIDAY_RESPONSE,
        payload: data
    }
}
export const getEventsResponse = (data) => {
    return {
        type: GET_EVENTS_RESPONSE,
        payload: data
    }
}
export const getDashboardResponse = (data) => {
    return {
        type: GET_DASHBOARD_RESPONSE,
        payload: data
    }
}

export const getHolidayList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/holiday/`, token).then((res) => {
            dispatch(getHolidayResponse(res.data))
        })
    }
}

export const createHoliday = (payload, token) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/hrm/holiday/create/`, payload, token)
            .then((res) => {
                if (res.data.error) {
                    swal({
                        title: "Error",
                        text: res.data.error,
                        icon: "error",
                        successMode: true,
                        timer: "3000",
                        buttons: false
                    });
                }
                else {
                    swal({
                        title: "Success",
                        text: "Data Registerd SuccessFully",
                        icon: "success",
                        successMode: true,
                        timer: "3000",
                        buttons: false
                    });
                    setTimeout(() => {
                        dispatch(getHolidayList(token))
                    }, 3000)
                }
            })
    }
}
export const updateHoliday = (payload, token, id) => {
    return (dispatch) => {
        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/hrm/holiday/create/${id}/`, payload, token).then((res) => {
            dispatch(getHolidayList(token))
        })
    }
}
export const deleteHolidayAPI = (token, id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/hrm/holiday/create/${id}/`, token)
            .then((res) => {
                swal({
                    title: "Deleted!",
                    text: "Your Holiday has been deleted! SuccessFully",
                    icon: "success",
                    successMode: true,
                    timer: "3000",
                    buttons: false
                });
                dispatch(getHolidayList(token))
            })
    }
}

export const getEventList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/event/`, token).then((res) => {
            dispatch(getEventsResponse(res.data))
        })
    }
}

export const createEvent = (payload, token) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/hrm/event/`, payload, token)
            .then((res) => {
                if (res.data.status) {
                    swal({
                        title: "Error",
                        text: res.data.status,
                        icon: "error",
                        successMode: true,
                        timer: "3000",
                        buttons: false
                    });
                }
                else {
                    swal({
                        title: "Success",
                        text: "Data Registerd SuccessFully",
                        icon: "success",
                        successMode: true,
                        timer: "3000",
                        buttons: false
                    });
                    setTimeout(() => {
                        dispatch(getEventList(token))
                    }, 3000)
                }
            })
    }
}

export const updateEvent = (payload, token, id) => {
    return (dispatch) => {
        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/hrm/event/${id}/`, payload, token).then((res) => {
            dispatch(getEventList(token))
        })
    }
}

export const deleteEventAPI = (token, id) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/hrm/event/${id}/`, token)
            .then((res) => {
                swal({
                    title: "Deleted!",
                    text: "Your Event has been deleted! SuccessFully",
                    icon: "success",
                    successMode: true,
                    timer: "3000",
                    buttons: false
                });
                dispatch(getEventList(token))
            })
    }
}
export const dashboard = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/dashboard/`, token).then((res) => {
            dispatch(getDashboardResponse(res.data))
        })
    }
}
