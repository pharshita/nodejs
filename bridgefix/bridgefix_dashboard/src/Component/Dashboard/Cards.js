import React, { useEffect, useState } from 'react'
import './Dashboard.css'
import BarChartIcon from '@mui/icons-material/BarChart';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PieChartIcon from '@mui/icons-material/PieChart';
import PersonIcon from '@mui/icons-material/Person';
import GroupIcon from '@mui/icons-material/Group';
import HolidayCard from './HolidayCard';
import EventCard from './EventCard';
import { useDispatch, useSelector } from 'react-redux';
import { dashboard } from '../../Redux/Action/dashboardAction';

function Cards() {
    const dispatch = useDispatch()
    const config = { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    const dashboardList = useSelector((state) => state.dashboardReducer.deshboardList)

    useEffect(() => {
        dispatch(dashboard(config))
    }, [])

    let cardDataList = [
        { head: "Total Projects", number: `${dashboardList!==null ? dashboardList.projectlist : 0}`, icon: <BarChartIcon />, average: "3.48%", color: "#DC3545" },
        { head: "PROJECT SUBMITTED", number: `${dashboardList!==null ? dashboardList.project_submitted : 0}`, icon: <PieChartIcon />, average: "3.48%", color: "#ffc107" },
        { head: "EMPLOYEES", number: `${dashboardList!==null ? dashboardList.employee : 0}`, icon: <PersonIcon />, average: "3.48%", color: "#ffd600" },
        { head: "TOTAL TEAMS", number: `${dashboardList!==null ? dashboardList.project_team : 0}`, icon: <GroupIcon />, average: "3.48%", color: "#17a2b8" },
    ]

    return (
        <div className='dashboardcardStyle'>
            <div className='row'>
                {
                    cardDataList.map((card, i) => {
                        return (
                            <div className='col-sm-12 col-lg-3 cardStyle' key={i}>
                                <div className='headIcon'><h5>{card.head}</h5> <div className='icon' style={{ background: card.color }}>{card.icon}</div></div>
                                <h3>{card.number}</h3>
                                <p><ArrowUpwardIcon /> {card.average} <span> since last month</span></p>
                            </div>
                        )
                    })

                }
                <div className='CardStyle1'>
                    <EventCard />
                    <HolidayCard />
                </div>
            </div>
        </div>
    )
}

export default Cards
