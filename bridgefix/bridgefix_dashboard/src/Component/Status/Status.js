import React, { useEffect, useState } from 'react';
import './Status.css';
import Search_Input from '../CommonComp/Search_Input';
import { CacheProvider, ThemeProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import MUIDataTable from 'mui-datatables';
import { createTheme } from "@mui/material/styles";
import { Link, useNavigate } from 'react-router-dom';
import { getEmployee } from '../../Redux/Action/employeeAction';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Chip } from '@mui/material';

const muiCache = createCache({
    key: "mui-datatables",
    prepend: true
});

export default function Status() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [responsive, setResponsive] = React.useState("standard");
    const [tableBodyHeight, setTableBodyHeight] = React.useState("470px");
    const [tableBodyMaxHeight, setTableBodyMaxHeight] = React.useState("");
    const [data, setData] = useState([])
    const [selectedId, setSelectedId] = useState(null);
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    const employeeList = useSelector((state) => state.employeeReducer.employeeList)
    useEffect(() => {
        dispatch(getEmployee(config))
    }, [])
    const handleShowStatus = (id) => {
        setSelectedId(id);
        navigate(`/status/${id}/`)
    }
    console.log(selectedId)

    const column = [
        { name: "ID", options: { filter: false } },
        { name: "S.N.", options: { filter: false } },
        { name: "EMAIL", options: { filter: false } },
        { name: "NAME", options: { filterOptions: { fullWidth: true } } },
        { name: "DEPARTMENT", options: { filter: false } },
        {
            name: "SHOW STATUS",
            options: {
                filter: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = tableMeta.rowData[0];
                    return (
                        <Button variant="contained"  style={{ cursor: "pointer", textDecoration: "none",background:"#2f7a92" }} onClick={() => handleShowStatus(id)}>
                            {value}
                        </Button>
                    );
                }
            }
        },
    ];
    React.useEffect(() => {
        if (employeeList.length > 0) {
            const newRows = employeeList.map((data, i) =>
                [
                    data.id,
                    i + 1,
                    data.email,
                    data.name,
                    data.department,
                    "Click"
                ]
            );

            setData(newRows);
        }
    }, [employeeList]);


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
            if (columnIndex === 0) {
                return { className: 'hidden-column' };
            }
            return { style: { textAlign: 'center' } };
        },
        selectableRows: 'none',
    };

    return (
        <div className='employeeStyle'>
            <div className="statusStyle">
                <Search_Input />
            </div>
            <div className='m-4 statusEmplyeeStyle'>
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
        </div>
    );
}
