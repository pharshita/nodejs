import React, { useEffect, useState } from 'react'
import Search_Input from '../CommonComp/Search_Input'
import './Employees.css'
import { Button } from '@mui/material'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, getEmployee, userList } from '../../Redux/Action/employeeAction';



function Employees() {
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [user, setUser] = useState("")
    const [image, setImage] = useState("")
    const [employeeName, setEmployeeName] = useState("")
    const [salary, setSalary] = useState("")
    const [department, setDepartment] = useState("")
    const [role, setRole] = useState("")
    const [row, setRow] = React.useState([])
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    const userListData = useSelector((state) => state.employeeReducer.userList)
    const employeeList = useSelector((state) => state.employeeReducer.employeeList)
    useEffect(() => {
        dispatch(userList(config))
        dispatch(getEmployee(config))
    }, [])

    function createData(image, email, name, department) {
        return { image, email, name, department };
    }

    useEffect(() => {
        setState(false)
        setImage("")
        setEmployeeName("")
        setSalary("")
        setDepartment("")
        setRole("")
        const filterdData = employeeList.filter((item, index) => {
            if (item.role == "EMPLOYEE") {
                return item
            }
        })
        if (filterdData.length > 0) {
            const newRows = filterdData.map((data, i) => {
                return (
                    createData(process.env.REACT_APP_API_BASE_URL+data.profile_image, data.email, data.name, data.department)
                )
            }
            );
            setRow(newRows);
        }
    }, [employeeList])
    const submitEmployee = () => {
        if (user !== "" && employeeName !== "" && salary !== "" && role !== "" && department !== "") {
            document.getElementById('employeeSubmitError').style.display = "none"
            const formData = new FormData()
            const otherDetail = {
                "user": user,
                "name": employeeName,
                "department": department,
                "salary": salary,
                "role": role
            };

            formData.append("profile_image", image)
            formData.append("other_detail", JSON.stringify(otherDetail));

            dispatch(createEmployee(formData, config))
        }
        else {
            document.getElementById('employeeSubmitError').style.display = "block"
        }
    }
    return (
        <div >
            <div className="EmplyeeStyle">
                <Search_Input />
            </div>
            <div className='tableStyle'>
                {
                    state
                        ? <>
                            <div style={{ display: "flex", justifyContent: 'space-between', padding: "20px" }}>
                                <h3>Create Employee Form</h3>
                                <Button variant="contained" onClick={() => { setState(false) }}>Show Employee's List</Button>
                            </div>
                            <div style={{ background: "white", color: "black", textAlign: "left", paddingTop: "20px" }}>
                                <input type='file' onChange={(e) => setImage(e.target.files[0])} /><br />
                                <label className='mt-4'>User <span style={{ color: "red" }}> * </span> :</label>
                                <select className='form-control mt-2' value={user} onChange={(e) => setUser(e.target.value)}>
                                    <option value="">---select user---</option>
                                    {
                                        userListData.length > 0 &&
                                        userListData.map((user, index) => {
                                            return (
                                                <option key={index} value={user.id}>{user.email}</option>
                                            )
                                        })
                                    }
                                </select>


                                <label className='mt-4'>Employee Name <span style={{ color: "red" }}> * </span> :</label>
                                <input className='form-control mt-2' value={employeeName} onChange={(e) => setEmployeeName(e.target.value)}></input>

                                <label className='mt-4'>Department <span style={{ color: "red" }}> * </span> :</label>
                                <input className='form-control mt-2' value={department} onChange={(e) => setDepartment(e.target.value)}></input>

                                <label className='mt-4'>Salary <span style={{ color: "red" }}> * </span> :</label>
                                <input type='number' className='form-control mt-2' value={salary} onChange={(e) => setSalary(e.target.value)}></input>

                                <label className='mt-4'>Role <span style={{ color: "red" }}> * </span> :</label>
                                <select className='form-control mt-2' value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value='null'>---------</option>
                                    <option value='ADMIN'>Admin</option>
                                    <option value='EMPLOYEE'>Employee</option>
                                    <option value='GENERAL_USER'>General User</option>
                                </select>
                                <div id="employeeSubmitError" style={{ marginTop: "30px", textAlign: "left", color: "red", display: "none" }} >
                                    <p style={{ padding: "5px", background: "antiquewhite" }}>All * Fields Required</p>
                                </div>
                                <Button variant="contained" className='mt-4' onClick={submitEmployee}>Create Employee</Button>
                            </div>
                        </>
                        : <>
                            <div style={{ display: "flex", justifyContent: 'space-between', padding: "40px 20px 20px 20px" }}>
                                <h3>Employee's List</h3>
                                <Button variant="contained" onClick={() => { setState(true) }}>Create Employee</Button>
                            </div>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650, background: "#343a40" }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow >
                                            <TableCell sx={{ color: "white" }}>IMAGE</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>EMAIL</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>Name</TableCell>
                                            <TableCell align="left" sx={{ color: "white" }}>DEPARTMENT</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.map((row) => (
                                            <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                                                <TableCell component="th" scope="row">
                                                    <img src={row.image} width='50' height='50' />
                                                </TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.email}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.name}</TableCell>
                                                <TableCell align="left" sx={{ color: "white" }}>{row.department}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>

                }
            </div>
        </div>
    )
}

export default Employees
