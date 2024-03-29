import axios from "axios";
import swal from "sweetalert";

export const loginFormApi = (payload, navigate ,email) => {
    return (dispatch) => {
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/login/`, payload)
            .then((res) => {
                localStorage.setItem("token", res.data.access)
                localStorage.setItem("employee_profile",  email);
                navigate('/dashboard')
            })
            .catch((err) => {
                swal({
                    title:"Error",
                    text:"User Not available",
                    icon:"error",
                    buttons:false,
                    timer:2000
                })

            })
    }
}
