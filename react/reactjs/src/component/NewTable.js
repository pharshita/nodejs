import axios from 'axios';
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from './Modal';

export default function NewTable(props) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")
    const [checkbox, setCheckbox] = useState([])
    const deletedata = (e) => {
        axios.delete(`http://127.0.0.1:5000/api/data/${e}`,).then((res) => {
            props.getapi()
        })
    }
    const updatedata = (e) => {
        setId(e._id)
        setName(e.name)
        setEmail(e.email)
        setPhone(e.phone)
        setAge(e.age)
        setGender(e.gender)
        setCheckbox(e.checkbox)
    }
    return (
        <div>
            {
                props.data.length !== 0
                    ? <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>SNO.</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Age</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Hobbies</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                props.data.map((item, index) => {
                                    return (
                                        <>
                                            <tr>
                                                <td>{index + 1}</td>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.age}</td>
                                                <td>{item.phone}</td>
                                                <td>{item.gender}</td>
                                                <td>
                                                    {
                                                        item.checkbox.map((hobby, i) => {
                                                            return (
                                                                <li>{hobby}</li>
                                                            )
                                                        })
                                                    }
                                                </td>
                                                <td><button onClick={() => deletedata(item._id)}>delete</button>
                                                    <button onClick={() => updatedata(item)} data-bs-toggle="modal" data-bs-target="#staticBackdrop">update</button></td>
                                            </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </Table>
                    : null
            }
            <Modal id={id} newname={name} newemail={email} newphone={phone} newgender={gender} newcheckbox={checkbox} newage={age} getapi={props.getapi} />
        </div>
    )
}
