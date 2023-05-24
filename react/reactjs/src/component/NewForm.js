import axios from 'axios'
import React, { useEffect, useState } from 'react'

function NewForm() {
    const [val1, setVal1] = useState(0)
    const [val2, setVal2] = useState(0)
    const [data, setData] = useState("")

    const getdata = () => {
        axios.get('http://127.0.0.1:5000/formdata').then((res) => {
            setData(res.data)
        })
    }
    useEffect(() => {
        getdata()
    }, [])

    const countfun = () => {
        let formdata = {
            "value1": val1,
            "value2": val2,
        }
        axios.post('http://127.0.0.1:5000/formdata', formdata).then((res) => {
            getdata()
        })
    }
    return (
        <div>
            <div>
                <input type='number' value={val1} onChange={(e) => setVal1(e.target.value)} />
                <input type='number' value={val2} onChange={(e) => setVal2(e.target.value)} />
                <button onClick={countfun}>count</button>
            </div>
            <div><h2>{data}</h2></div>
        </div>
    )
}

export default NewForm
