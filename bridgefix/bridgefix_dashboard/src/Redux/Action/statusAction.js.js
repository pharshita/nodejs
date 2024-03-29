import axios from "axios"
import swal from "sweetalert"
export const GET_PROJECT_RESPONSE = "GET_PROJECT_RESPONSE"
export const GET_STATUS_RESPONSE = "GET_STATUS_RESPONSE"

export const getProjectResponse = (data) => {
    return {
        type: GET_PROJECT_RESPONSE,
        payload: data
    }
}
export const getStatusResponse = (data) => {
    return {
        type: GET_STATUS_RESPONSE,
        payload: data
    }
}

export const getProjectList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/project/`, token)
            .then((res) => {
                dispatch(getProjectResponse(res.data))
            })
    }
}

export const getStatusListID = (token , id) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/status/${id}/`, token)
            .then((res) => {
                dispatch(getStatusResponse(res.data))
            })
    }
}

export const postStatus = (payload, token,id) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/hrm/status/`, payload, token)
            .then((res) => {
                swal({
                    title: "Success",
                    text: "Status Update SuccessFully",
                    icon: "success",
                    successMode: true,
                    timer: "3000",
                    buttons: false
                });
                setTimeout(() => {
                    dispatch(getStatusListID(token,id))
                }, 3000)
            })
    }
}

// export const deleteLeave = (id, token) => {
//     return (dispatch) => {
//         axios.delete(`${process.env.REACT_APP_API_BASE_URL}/hrm/leave/${id}/`, token)
//             .then((res) => {
//                 swal({
//                     title: "Deleted!",
//                     text: "Your Leave has been deleted! SuccessFully",
//                     icon: "success",
//                     successMode: true,
//                     timer: "3000",
//                     buttons: false
//                 });
//                 dispatch(getLeaveList(token))
//             })
//     }
// }
// export const updateLeave = (payload, token, id) => {
//     return (dispatch) => {
//         axios.patch(`${process.env.REACT_APP_API_BASE_URL}/hrm/leave/${id}/`, payload, token)
//             .then((res) => {
//                 dispatch(getLeaveList(token))
//             })
//     }
// }
