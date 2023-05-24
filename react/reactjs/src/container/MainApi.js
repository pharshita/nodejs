import React, { useEffect, useState } from 'react'
import axios from "axios"
import Form from '../component/Form'
import NewTable from '../component/NewTable'
import { Link } from 'react-router-dom'

export default function MainApi() {
    const [data, setData] = useState([])
    // useEffect(() => {
    //   axios.get("http://127.0.0.1:5000/duummyData")
    //     .then((res) => {
    //       debugger
    //     })
  
    //   axios.get("http://127.0.0.1:5000/create")
    //     .then((res) => {
    //       debugger
    //     })
    // }, [])
    var getapi = () => {
      axios.get("http://127.0.0.1:5000/api/data").then((res) => {
        setData(res.data)
      })
    }
  
    console.log(data)
    useEffect(() => {
      getapi()
    }, [])
    const handleclick = (name, email,phone) => {
      let userData = {
        "id": Math.floor(Math.random() * 100),
        "name": name,
        "email": email,
        "phone": phone
      }
      axios.post("http://127.0.0.1:5000/api/data", userData).then((res) => {
        getapi()
      })
    }
    return (
        <div>
           {/* <Link to="/newform"><button>Calc</button></Link> */}
            <Form clickfun={handleclick} />
            <div style={{ marginTop: "30px" }}>
                <NewTable data={data} getapi={getapi} />
            </div>

        </div>
    )
}
