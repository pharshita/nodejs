import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Modal(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (props) {
            setName(props.newname)
            setEmail(props.newemail)
            setPhone(props.newphone )
        }
    }, [props])

    const handleclick = () => {
        let userData = {
            "id": props.id,
            "name": name,
            "email": email,
            "phone": phone
        }
        axios.put(`http://127.0.0.1:5000/api/data/${props.id}`, userData).then((res) => {
            props.getapi()
        })
    }
    return (
        <div>
            <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)}  />
                            <button onClick={handleclick}   data-bs-dismiss="modal">submit</button>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
