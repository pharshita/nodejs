import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Form(props) {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("");
    const [hobbies, setHobbies] = useState([]);
    // let checkboxValue = []
    const submit = (event) => {
        event.preventDefault();
        // var ele = document.getElementsByName('gender');
        // for (let i = 0; i < ele.length; i++) {
        //     if (ele[i].checked) {
        //         var genderValue = ele[i].value
        //     }
        // }

        // var ele = document.getElementsByName('checkbox');
        // for (let i = 0; i < ele.length; i++) {
        //     if (ele[i].checked) {
        //         checkboxValue.push(ele[i].value)
        //     }
        // }
        if (name !== "" && email !== "" && phone !== "" && age !== "" && gender !== ""&&hobbies.length!==0) {
            props.clickfun(name, email, phone, age, gender, hobbies)
            setName("")
            setEmail("")
            setPhone("")
            setAge("")
            setGender("")
            setHobbies([])
        }
        else {
            alert("please fill all required fields")
        }
    }

    const handleCheckboxChange = (e) => {
        const value = e.target.value;
        if (e.target.checked) {
            setHobbies((prevHobbies) => [...prevHobbies, value]);
        } else {
            setHobbies((prevHobbies) => prevHobbies.filter((hobby) => hobby !== value));
        }
    };

    return (
        <div>
            <form>
                <input type='text' placeholder='Enter Your Name' value={name} onChange={(e) => setName(e.target.value)} />
                <input type='email' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type='number' placeholder='Enter Your no.' value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type='number' placeholder='Enter Your age' value={age} onChange={(e) => setAge(e.target.value)} />
                <input type="radio" name="gender" value="male"  checked={gender === 'male'} onChange={(e) => setGender(e.target.value)} /> Male
                <input type="radio" name="gender" value="female"  checked={gender === 'female'} onChange={(e) => setGender(e.target.value)} /> Female
                <input type='checkbox' name='checkbox' value="singing" checked={hobbies.includes('singing')} onChange={handleCheckboxChange}/>singing
                <input type='checkbox' name='checkbox' value="dancing" checked={hobbies.includes('dancing')} onChange={handleCheckboxChange}/>dancing
                <input type='checkbox' name='checkbox' value="reading" checked={hobbies.includes('reading')}  onChange={handleCheckboxChange}/>reading
                <button onClick={submit}>submit</button>
                <button onClick={()=> navigate("/")}>Logout</button>
            </form>
        </div>
    )
}

export default Form
