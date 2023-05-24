import React, { useState } from 'react'

function Form(props) {
const [name,setName]=useState("")
const [email,setEmail]=useState("")
const [phone,setPhone]=useState("")
    const submit = () => {
        if(name!==""&&email!==""&&phone!==""){
            props.clickfun(name,email,phone)
        }
        else{
            alert("please fill all required fields")
        }
    }
    return (
        <div>
            <form>
                <input type='text' placeholder='Enter Your Name' value={name} onChange={(e)=>setName(e.target.value)}/>
                <input type='email' placeholder='Enter Your Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                <input type='number' placeholder='Enter Your no.' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                <button onClick={submit}>submit</button>
            </form>
        </div>
    )
}

export default Form
