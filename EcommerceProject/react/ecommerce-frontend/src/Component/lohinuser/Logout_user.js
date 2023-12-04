import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logout_user() {
    const localAuth = JSON.parse(localStorage.getItem("auth"))

    const navigate = useNavigate()
    const logouthandle = () => {
        localStorage.clear()
        window.location.href = "/"
    }
    return (
        <>
            <div style={{ marginTop: "40px" }}>
                <img src='https://cdn-icons-png.flaticon.com/512/149/149071.png' width='200'></img>
                <h5>{localAuth.user}</h5>
                <button className="userbtn" onClick={logouthandle}>logout</button>
            </div>
        </>
    )
}

