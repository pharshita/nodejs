import axios from "axios"
import swal from "sweetalert"
export const GET_RESPONSE = "GET_RESPONSE"
export const getLeaveResponse = (data) => {
    return {
        type: GET_RESPONSE,
        payload: data
    }
}

export const getLeaveList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/leave/`, token)
            .then((res) => {
                dispatch(getLeaveResponse(res.data))
            })
    }
}

export const applyLeave = (payload, token) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/hrm/leave/`, payload, token)
            .then((res) => {
                swal({
                    title: "Success",
                    text: "Leave Apply SuccessFully",
                    icon: "success",
                    successMode: true,
                    timer: "3000",
                    buttons: false
                });
                setTimeout(() => {
                    dispatch(getLeaveList(token))
                }, 3000)
            })
    }
}

export const deleteLeave = (id, token) => {
    return (dispatch) => {
        axios.delete(`${process.env.REACT_APP_API_BASE_URL}/hrm/leave/${id}/`, token)
            .then((res) => {
                swal({
                    title: "Deleted!",
                    text: "Your Leave has been deleted! SuccessFully",
                    icon: "success",
                    successMode: true,
                    timer: "3000",
                    buttons: false
                });
                dispatch(getLeaveList(token))
            })
    }
}
export const updateLeave = (payload, token, id) => {
    return (dispatch) => {
        axios.patch(`${process.env.REACT_APP_API_BASE_URL}/hrm/leave/${id}/`, payload, token)
            .then((res) => {
                dispatch(getLeaveList(token))
            })
    }
}
