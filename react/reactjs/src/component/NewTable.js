import axios from 'axios';
import React, { useState } from 'react'
import Table from 'react-bootstrap/Table';
import Modal from './Modal';

export default function NewTable(props) {
    const [id, setId] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const deletedata = (e) => {
        axios.delete(`http://127.0.0.1:5000/api/data/${e}`,).then((res) => {
            props.getapi()
        })
    }
    const updatedata = (e) => {
        setId(e.id)
        setName(e.name)
        setEmail(e.email)
        setPhone(e.phone)
    }
    return (
        <div>
            {
               props.data.length!==0
                    ? <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>sr</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
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
                                                <td>{item.phone}</td>
                                                <td><button onClick={() => deletedata(item.id)}>delete</button>
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
                <Modal id={id} newname={name} newemail={email} newphone={phone} getapi={props.getapi} />
        </div>
    )
}
