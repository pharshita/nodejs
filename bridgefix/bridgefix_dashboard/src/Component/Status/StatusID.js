import React, { useEffect, useState } from 'react'
import './Status.css';
import Search_Input from '../CommonComp/Search_Input';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from 'mui-datatables';
import { createTheme } from "@mui/material/styles";
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList, getStatusListID, postStatus } from '../../Redux/Action/statusAction.js';
import { Button } from '@mui/material';

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});

export default function StatusID() {
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [state, setState] = useState(false)
    const [responsive, setResponsive] = useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = useState("470px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = useState("");
    const [dailyStatus, setDailyStatus] = useState("");
    const [date, setDate] = useState("");
    const [inTime, setInTime] = useState("10:30:01")
    const [outTime, setOutTime] = useState("19:30:01")
    const [projectName, setProjectName] = useState("")
    const [data, setData] = useState([])
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    const ProjectList = useSelector((state) => state.statusReducer.ProjectList)
    const StatusIDList = useSelector((state) => state.statusReducer.StatusIDList)
    const column = [
        { name: "NAME", options: { filterOptions: { fullWidth: true } } },
        { name: "STATUS", options: { filter: false } },
        { name: "STATUS DATE", options: { filter: false } },
        { name: "IN TIME", options: { filter: false } },
        { name: "OUT TIME", options: { filter: false } },
        { name: "PROJECT", options: { filter: false } },
    ];

    useEffect(() => {
        setState(false)
        setDailyStatus("")
        setDate("")
        setInTime("10:30:01")
        setOutTime("19:30:01")
        setProjectName("")

        if (StatusIDList.length > 0) {
            const newRows = StatusIDList.map((data, i) =>
                [
                    data.employee_status,
                    data.status,
                    data.status_date,
                    data.in_time,
                    data.out_time,
                    data.project_name,
                ]
            );

            setData(newRows);
        }
    }, [StatusIDList])


    useEffect(() => {
        dispatch(getProjectList(config))
        dispatch(getStatusListID(config, id))
    }, [])

    const options = {
        search: true,
        download: true,
        print: true,
        viewColumns: true,
        filter: true,
        filterType: "dropdown",
        responsive,
        tableBodyHeight,
        tableBodyMaxHeight,
        setCellProps: (cellValue, columnIndex) => {
            return { style: { textAlign: 'center' } };
        },
        selectableRows: 'none',
    };

    const onUpdate = () => { }
    const onSubmit = () => {
        if (dailyStatus !== "" && date !== "" && inTime !== "" && outTime !== "" && id !== "" && projectName !== "") {
            document.getElementById('statusSubmitError').style.display = "none"
            const payload = {
                "status": dailyStatus,
                "status_date": date,
                "in_time": inTime,
                "out_time": outTime,
                "employee_status": parseInt(id),
                "project_name": parseInt(projectName)
            }
            dispatch(postStatus(payload, config,id))
        }
        else {
            document.getElementById('statusSubmitError').style.display = "block"
        }
    }

    return (
        <div className='employeeStyle'>
            <div className="statusStyle">
                <Search_Input />
            </div>
            {
                state
                    ? <>
                        <div style={{ display: "flex", justifyContent: 'end', padding: "20px" }}>
                            <Button variant="contained" onClick={() => { setState(false) }}>Show Status List</Button>
                        </div>
                        <div>
                            <div style={{ background: "white", color: "black", textAlign: "left", paddingTop: "20px" }}>
                                <label className='mt-4'>Status <span style={{ color: "red" }}> * </span> :</label>
                                <textarea className='form-control mt-2' style={{ minHeight: "150px" }} value={dailyStatus} onChange={(e) => setDailyStatus(e.target.value)}></textarea>

                                <label className='mt-4'>Status Date <span style={{ color: "red" }}> * </span> :</label>
                                <input type='date' className='form-control mt-2' value={date} onChange={(e) => setDate(e.target.value)} />

                                <label className='mt-4'>In Time <span style={{ color: "red" }}> * </span> :</label>
                                <input type='time' className='form-control mt-2' value={inTime} onChange={(e) => setInTime(e.target.value)}></input>

                                <label className='mt-4'>Out Time <span style={{ color: "red" }}> * </span> :</label>
                                <input type='time' className='form-control mt-2' value={outTime} onChange={(e) => setOutTime(e.target.value)}></input>

                                <label className='mt-4'>Project <span style={{ color: "red" }}> * </span> :</label>
                                <select className='form-control mt-2' value={projectName} onChange={(e) => setProjectName(e.target.value)}>
                                    <option value="">-- select Project --</option>
                                    {
                                        ProjectList.length > 0 &&
                                        ProjectList.map((user, index) => {
                                            return (
                                                <option key={index} value={user.id}>{user.project_name}</option>
                                            )
                                        })
                                    }
                                </select>
                                <div id="statusSubmitError" style={{ marginTop: "30px", textAlign: "left", color: "red", display: "none" }} >
                                    <p style={{ padding: "5px", background: "antiquewhite" }}>All * Fields Required</p>
                                </div>
                                <Button variant="contained" className='mt-4'
                                    // onClick={editId !== "" ? onUpdate : onSubmit}>{editId !== "" ? "Update Leave" : "Apply Leave"}
                                    onClick={onSubmit}>SUBMIT STATUS
                                </Button>
                            </div>
                        </div>
                    </>
                    : <>
                        <div style={{ display: "flex", justifyContent: 'space-between', padding: "20px" }}>
                            <Button variant="contained" style={{background:"#e7dfdf",color:"black"}} onClick={() => navigate('/status') }>Back</Button>
                            <Button variant="contained" onClick={() => { setState(true) }}>Status Update</Button>
                        </div>
                        <div>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Employee Status Update"}
                                        data={data}
                                        columns={column}
                                        options={options}
                                        className="custom-table"
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </>
            }

        </div>
    )
}
