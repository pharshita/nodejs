import React, { useEffect, useState } from 'react'
import Search_Input from '../CommonComp/Search_Input'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import './Leave.css'
import { useDispatch, useSelector } from 'react-redux';
import { applyLeave, deleteLeave, getLeaveList, updateLeave } from '../../Redux/Action/leaveAction';
import { getEmployee } from '../../Redux/Action/employeeAction';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import swal from 'sweetalert';

function Leave() {
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [employeeName, setEmployeeName] = useState("")
    const [reason, setReason] = useState("")
    const [leaveDays, setLeaveDays] = useState("")
    const [leaveDate, setLeaveDate] = useState("")
    const [leaveType, setLeaveType] = useState("")
    // const [leaveStatus, setLeaveStatus] = useState("")
    const [editId, setEditId] = useState("")
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    const LeaveList = useSelector((state) => state.leaveReducer.LeaveList)
    const employeeList = useSelector((state) => state.employeeReducer.employeeList)
    useEffect(() => {
        dispatch(getLeaveList(config))
        dispatch(getEmployee(config))
    }, [])


    useEffect(() => {
        setState(false)
        setEmployeeName("")
        setReason("")
        setLeaveDays("")
        setLeaveDate("")
        setLeaveType("")
        // setLeaveStatus("")
    }, [LeaveList])

    const applyLeaveSubmit = () => {
        if (reason !== "" && employeeName !== "" && leaveDays !== "" && leaveDate !== "" && leaveType !== "" ) {
            document.getElementById('employeeSubmitError').style.display = "none"
            const payload = {
                "other_detail": {
                    // "status": leaveStatus,
                    "leave_type": leaveType,
                    "leave_start_date": leaveDate,
                    "leave_days": leaveDays,
                    "leave_reason": reason,
                    "employee_id": employeeName
                }
            }
            dispatch(applyLeave(payload, config))
        }
        else {
            document.getElementById('employeeSubmitError').style.display = "block"
        }
    }

    const applyLeaveUpdate = () => {
        if (reason !== "" && employeeName !== "" && leaveDays !== "" && leaveDate !== "" && leaveType !== "") {
            document.getElementById('employeeSubmitError').style.display = "none"
            const payload = {
                "other_detail": {
                    // "status": leaveStatus,
                    "leave_type": leaveType,
                    "leave_start_date": leaveDate,
                    "leave_days": leaveDays,
                    "leave_reason": reason,
                    "employee_id": employeeName
                }
            }
            dispatch(updateLeave(payload, config, editId))
        }
        else {
            document.getElementById('employeeSubmitError').style.display = "block"
        }
    }
    const deleteLeaveID = (id) => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to Delete Leave",
            icon: "warning",
            dangerMode: true,
            buttons: true
        })
            .then(willDelete => {
                if (willDelete) {
                    dispatch(deleteLeave(id, config))
                }
            });
    }

    const updateLeaveID = (data) => {
        setEmployeeName(data.employee_id)
        setReason(data.leave_reason)
        setLeaveDays(data.leave_days)
        setLeaveDate(data.leave_start_date)
        setLeaveType(data.leave_type)
        // setLeaveStatus(data.status)
        setEditId(data.id)
        setState(true)
    }

    return (
        <div >
            <div className="LeaveStyle">
                <Search_Input />
            </div>
            <div className='leavetableStyle'>
                {
                    state
                        ? <>
                            <div style={{ display: "flex", justifyContent: 'space-between', padding: "20px" }}>
                                <h3>Apply Leave Form</h3>
                                <Button variant="contained" onClick={() => { setState(false) }}>Show Leave's List</Button>
                            </div>
                            <div style={{ background: "white", color: "black", textAlign: "left", paddingTop: "20px" }}>
                                <label className='mt-4'>Employee Name <span style={{ color: "red" }}> * </span> :</label>
                                <select disabled={editId == "" ? false : true} className='form-control mt-2' value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}>
                                    <option value="">-- select Employee --</option>
                                    {
                                        employeeList.length > 0 &&
                                        employeeList.map((user, index) => {
                                            return (
                                                <option key={index} value={user.id}>{user.name}</option>
                                            )
                                        })
                                    }
                                </select>

                                <label className='mt-4'>LEAVE REASON <span style={{ color: "red" }}> * </span> :</label>
                                <input className='form-control mt-2' value={reason} onChange={(e) => setReason(e.target.value)}></input>

                                <label className='mt-4'>Total Leave Days <span style={{ color: "red" }}> * </span> :</label>
                                <input type='number' className='form-control mt-2' value={leaveDays} onChange={(e) => setLeaveDays(e.target.value)}></input>

                                <label className='mt-4'>Date <span style={{ color: "red" }}> * </span> :</label>
                                <input type='date' className='form-control mt-2' value={leaveDate} onChange={(e) => setLeaveDate(e.target.value)}></input>

                                <label className='mt-4'>Leave Type<span style={{ color: "red" }}> * </span> :</label>
                                <select className='form-control mt-2' value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
                                    <option value='null'>---------</option>
                                    <option value='PAID'>PAID</option>
                                    <option value='UNPAID'>UNPAID</option>
                                </select>


                                {/* <label className='mt-4'>Leave Status<span style={{ color: "red" }}> * </span> :</label>
                                <select className='form-control mt-2' value={leaveStatus} onChange={(e) => setLeaveStatus(e.target.value)}>
                                    <option value='null'>---------</option>
                                    <option value='APPROVED'>APPROVED</option>
                                    <option value='REJECTED'>REJECTED</option>
                                    <option value='PENDING'>PENDING</option>
                                </select> */}


                                <div id="employeeSubmitError" style={{ marginTop: "30px", textAlign: "left", color: "red", display: "none" }} >
                                    <p style={{ padding: "5px", background: "antiquewhite" }}>All * Fields Required</p>
                                </div>
                                <Button variant="contained" className='mt-4' onClick={editId !== "" ? applyLeaveUpdate : applyLeaveSubmit}>{editId !== "" ? "Update Leave" : "Apply Leave"}</Button>
                            </div>
                        </>
                        : <>
                            <div style={{ display: "flex", justifyContent: 'space-between', padding: "40px 20px 20px 20px" }}>
                                <h3>Employee's List</h3>
                                <Button variant="contained" onClick={() => { setState(true) }}>Apply Leave</Button>
                            </div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650, background: "#343a40" }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow >
                                            <TableCell sx={{ color: "white" }}>IMAGE</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>EMPLOYEE NAME</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>LEAVE REASON</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>TOTAL LEAVE DAYS</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>LEAVE DATE</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>LEAVE TYPE</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>LEAVE STATUS</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>ACTION</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {LeaveList.length > 0 && LeaveList.map((row) =>
                                        (
                                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell component="th" scope="row">
                                                    <img src={process.env.REACT_APP_API_BASE_URL + row.profile_image} width='50' height='50' />
                                                </TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.employee_name}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.leave_reason}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.leave_days}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.leave_start_date}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.leave_type}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.status}</TableCell>
                                                <TableCell align='justify'>
                                                    <DeleteIcon sx={{ color: "#e71212", marginLeft: "-20px" }} onClick={() => deleteLeaveID(row.id)} />
                                                    <EditIcon sx={{ color: "green", marginLeft: "20px" }} onClick={() => updateLeaveID(row)} />
                                                </TableCell>
                                            </TableRow>
                                        )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                }
            </div>
        </div >
    )
}

export default Leave
