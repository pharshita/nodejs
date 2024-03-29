import React, { useEffect, useState } from 'react'
import { createHoliday, deleteHolidayAPI, getHolidayList, updateHoliday } from '../../Redux/Action/dashboardAction'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';

function HolidayCard() {
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [holidayName, setHolidayName] = useState('')
    const [holidayDate, setHolidayDate] = useState('')
    const [holidayEditID, setHolidayEditID] = useState('')
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

    const holidayList = useSelector((state) => state.dashboardReducer.holidayList)

    useEffect(() => {
        setState(false)
        setHolidayName('')
        setHolidayDate('')
        setHolidayEditID('')
    }, [holidayList])

    useEffect(() => {
        dispatch(getHolidayList(config))
    }, [])

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const holidaySubmit = () => {
        if (holidayName !== '' && holidayDate !== '') {
            document.getElementById('holidayPostError').style.display = "none"
            let payload = {
                "holiday_name": holidayName,
                "holiday_date": holidayDate
            }
            dispatch(createHoliday(payload, config))
        }
        else {
            document.getElementById('holidayPostError').style.display = "block"
        }
    }

    const holidayUpdate = () => {
        if (holidayName !== '' && holidayDate !== '') {
            let payload = {
                "holiday_name": holidayName,
                "holiday_date": holidayDate
            }
            dispatch(updateHoliday(payload, config, holidayEditID))
        }
    }

    const deleteHoliday = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to Delete Holiday",
            icon: "warning",
            dangerMode: true,
            buttons: true
        })
            .then(willDelete => {
                if (willDelete) {
                    dispatch(deleteHolidayAPI(config, id))
                }
            });

    }
    const editHoliday = (data) => {
        setHolidayName(data.holiday_name)
        setHolidayDate(data.holiday_date)
        setHolidayEditID(data.id)
        setState(true)
    }
    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <h3>UPCOMING HOLIDAY</h3>
                <Button variant="contained" style={{ width: "230px", height: "40px" }} onClick={() => setState(!state)}>{state ? "Show Holidays" : "ADD HOLIDAY"}</Button>
            </div>
            {
                state
                    ? <div style={{ width: "100%", marginTop: "20px" }}>
                        <div style={{ display: "flex", width: "100%" }}>
                            <label style={{ width: "40%" }}>Holiday Name : </label>
                            <input type='text' style={{ width: "60%" }} value={holidayName} onChange={(e) => setHolidayName(e.target.value)} />
                        </div><br />
                        <div style={{ display: "flex", width: "100%" }} >
                            <label style={{ width: "40%" }}>Holiday Date : </label>&nbsp;&nbsp;
                            <input type='date' style={{ width: "60%" }} value={holidayDate} onChange={(e) => setHolidayDate(e.target.value)} />
                        </div>
                        <div id="holidayPostError" style={{ marginTop: "30px", textAlign: "center", color: "red", display: "none" }} >
                            <p style={{ padding: "5px", background: "antiquewhite" }}>All Fields Required</p>
                        </div>
                        <div className='text-center mt-5'>
                            <button className='btn btn-primary' onClick={holidayEditID !== '' ? holidayUpdate : holidaySubmit}>{holidayEditID !== '' ? "Update" : "Submit"}</button>
                        </div>
                    </div>
                    : <table style={{ width: "100%" }}>
                        <thead style={{ background: "#e9ecef" }}>
                            <tr style={{ fontSize: "13px" }}>
                                <td style={{ padding: "10px" }}>DATE MONTH</td>
                                <td style={{ padding: "10px" }}>HOLIDAY NAME</td>
                                <td style={{ padding: "10px" }}>ACTION</td>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                holidayList.length > 0 &&
                                holidayList.map((holiday, index) => {
                                    return (
                                        <tr style={{ fontSize: "13px" }} key={index}>
                                            <td style={{ padding: "10px", fontWeight: "bold" }}>  {formatDate(holiday.holiday_date)}</td>
                                            <td style={{ padding: "10px" }}>{holiday.holiday_name}</td>
                                            <td style={{ padding: "10px", display: "flex", justifyContent: "space-around" }}><DeleteIcon sx={{ color: "#e71212" }} onClick={() => deleteHoliday(holiday.id)} /><EditIcon sx={{ color: "green" }} onClick={() => editHoliday(holiday)} /></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default HolidayCard
