import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Modal(props) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [age, setAge] = useState("")

    useEffect(() => {
        if (props) {
            console.log(props)
            setName(props.newname)
            setEmail(props.newemail)
            setPhone(props.newphone)
            setAge(props.newage)
            const genderbox = document.querySelectorAll("input[id=gender]")
            genderbox.forEach((gender) => {
                gender.checked = props.newgender.includes(gender.value);
            });

            const checkbox = document.querySelectorAll('input[id=checkbox]');
            checkbox.forEach((check) => {
                check.checked = props.newcheckbox.includes(check.value);
            });
        }
    }, [props])


    const handleclick = () => {
        var ele = document.getElementsByName('gender');
        for (let i = 0; i < ele.length; i++) {
            if (ele[i].checked) {
                var genderValue = ele[i].value
            }
        }
        let checkboxValue = []
        var checkbox = document.getElementsByName('checkbox');
        for (let i = 0; i < checkbox.length; i++) {
            if (checkbox[i].checked) {
                 checkboxValue.push(checkbox[i].value)
            }
        }

        let userData = {
            "id": props.id,
            "name": name,
            "email": email,
            "phone": phone,
            "age": age,
            "gender": genderValue,
            "checkbox":checkboxValue,
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
                            <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />
                            <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} /><br />
                            <input type="radio" name="gender" id='gender' value="male" /> Male
                            <input type="radio" name="gender" id='gender' value="female" /> Female
                            <input type='checkbox' name='checkbox' value="singing" id='checkbox'/>singing
                            <input type='checkbox' name='checkbox' value="dancing"  id='checkbox'/>dancing
                            <input type='checkbox' name='checkbox' value="reading"  id='checkbox'/>reading
                            <br /> <button onClick={handleclick} data-bs-dismiss="modal">submit</button>
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
