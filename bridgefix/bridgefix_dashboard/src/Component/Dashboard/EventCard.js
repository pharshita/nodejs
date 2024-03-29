import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { createEvent, deleteEventAPI, getEventList, updateEvent } from '../../Redux/Action/dashboardAction';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import swal from 'sweetalert';


function EventCard() {
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [eventName, setEventName] = useState('')
    const [eventDate, setEventDate] = useState('')
    const [eventDesc, setEventDesc] = useState('')
    const [eventEditID, setEventEditID] = useState('')
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }

    const eventsList = useSelector((state) => state.dashboardReducer.eventList)

    useEffect(() => {
        setState(false)
        setEventName('')
        setEventDate('')
        setEventDesc('')
        setEventEditID('')
    }, [eventsList])

    useEffect(() => {
        dispatch(getEventList(config))
    }, [])

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };
    const eventSubmit = () => {
        if (eventName !== '' && eventDate !== '') {
            document.getElementById('eventPostError').style.display = "none"
            let payload = {
                "name": eventName,
                "date": eventDate,
                "description": eventDesc
            }
            dispatch(createEvent(payload, config))
        }
        else {
            document.getElementById('eventPostError').style.display = "block"
        }
    }

    const eventUpdate = () => {
        if (eventName !== '' && eventDate !== '') {
            let payload = {
                "name": eventName,
                "date": eventDate,
                "description": eventDesc
            }
            dispatch(updateEvent(payload, config, eventEditID))
        }
    }

    const deleteEvent = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to Delete Event",
            icon: "warning",
            dangerMode: true,
            buttons: true
        })
            .then(willDelete => {
                if (willDelete) {
                    dispatch(deleteEventAPI(config, id))
                }
            });
    }
    const editEvent = (data) => {
        setEventName(data.name)
        setEventDate(data.date)
        setEventDesc(data.description)
        setEventEditID(data.id)
        setState(true)
    }
    return (
        <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                <h2>Events</h2>
                <Button variant="contained" style={{ width: "230px", height: "40px" }} onClick={() => setState(!state)}>{state ? "Show EVENTS" : "ADD NEW EVENTS"}</Button>
            </div>
            {
                state
                    ? <div style={{ width: "100%", marginTop: "20px" }}>
                        <div style={{ display: "flex", width: "100%" }}>
                            <label style={{ width: "20%" }}>Event Name : </label>
                            <input type='text' style={{ width: "60%" }} value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        </div><br />
                        <div style={{ display: "flex", width: "100%" }} >
                            <label style={{ width: "20%" }}>Event Date : </label>&nbsp;&nbsp;
                            <input type='date' style={{ width: "60%", marginLeft: "-8px" }} value={eventDate} onChange={(e) => setEventDate(e.target.value)} />
                        </div><br />
                        <div style={{ display: "flex", width: "100%" }}>
                            <label style={{ width: "20%" }}>Description : </label>
                            <textarea type='text' style={{ width: "60%", height: "100px" }} value={eventDesc} onChange={(e) => setEventDesc(e.target.value)} />
                        </div>
                        <div id="eventPostError" style={{ marginTop: "30px", textAlign: "center", color: "red", display: "none" }} >
                            <p style={{ padding: "5px", background: "antiquewhite" }}>All Fields Required</p>
                        </div>
                        <div className='text-center mt-5'>
                            <button className='btn btn-primary' onClick={eventEditID !== '' ? eventUpdate : eventSubmit}>{eventEditID !== '' ? "Update" : "Submit"}</button>
                        </div>
                    </div>
                    :
                    <table style={{ width: "100%" }}>
                        <thead style={{ background: "#e9ecef" }}>
                            <tr style={{ fontSize: "13px" }}>
                                <td style={{ padding: "10px" }}>DATE</td>
                                <td style={{ padding: "10px" }}>EVENT NAME</td>
                                <td style={{ padding: "10px" }}>DESCRIPTION</td>
                                <td style={{ padding: "10px", textAlign: "center" }}>ACTION</td>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                eventsList.length > 0 &&
                                eventsList.map((event, index) => {
                                    return (
                                        <tr style={{ fontSize: "13px" }} key={index}>
                                            <td style={{ padding: "10px", fontWeight: "bold" }}>  {formatDate(event.date)}</td>
                                            <td style={{ padding: "10px" }}>{event.name}</td>
                                            <td style={{ padding: "10px" }}>{event.description}</td>
                                            <td style={{ textAlign: "center", padding: "10px", display: "flex", justifyContent: "space-evenly" }}><DeleteIcon sx={{ color: "#e71212" }} onClick={() => deleteEvent(event.id)} /><EditIcon sx={{ color: "green" }} onClick={() => editEvent(event)} /></td>
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

export default EventCard
