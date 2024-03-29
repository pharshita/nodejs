import React, { useEffect } from 'react'
import './Dashboard.css'
import Cards from './Cards';
import Search_Input from '../CommonComp/Search_Input';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { dashboard } from '../../Redux/Action/dashboardAction';

function Dashboard() {
    return (
        <div className='dashboardStyle'>
            <Search_Input />
            <hr style={{ color: "white" }}></hr>
            <Cards />
            <div style={{ background: "#f8f9fe", padding: "30px", margin: "40px 0px" }}>
                <p style={{ padding: "0px", margin: "0px" }}><Link to="https://bridgefix.co/" target='blank'>© BridgeFix Technology</Link> - coded by BridgeFix-Team</p>
            </div>
        </div>
    )
}

export default Dashboard
