import axios from "axios"
import swal from "sweetalert"
export const USER_LIST_RESPONSE = "USER_LIST_RESPONSE"
export const EMPLOYEE_LIST_RESPONSE = "EMPLOYEE_LIST_RESPONSE"

export const userListResponse = (data) => {
    return {
        type: USER_LIST_RESPONSE,
        payload: data
    }
}
export const employeeListResponse = (data) => {
    return {
        type: EMPLOYEE_LIST_RESPONSE,
        payload: data
    }
}
export const userList = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/user/`,token)
            .then((res) => {
                dispatch(userListResponse(res.data))
            })
    }
}
export const createEmployee = (payload, token) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/hrm/employee/`, payload, token)
            .then((res) => {
                swal({
                    title: "Success",
                    text: "Employee Created SuccessFully",
                    icon: "success",
                    successMode: true,
                    timer: "3000",
                    buttons: false
                });
                setTimeout(() => {
                    dispatch(getEmployee(token))
                    dispatch(userList(token))
                }, 3000)
            })
    }
}
export const getEmployee = (token) => {
    return (dispatch) => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/hrm/employee/`, token)
            .then((res) => {
                dispatch(employeeListResponse(res.data))
            })
    }
}