import React from 'react'
import './SIdeNavBar.css'
import logo from '../images/logo.png'
import ComputerIcon from '@mui/icons-material/Computer';
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import PaidIcon from '@mui/icons-material/Paid';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import { Link, useLocation, useNavigate } from 'react-router-dom';


function SideNavBar() {
    const location = useLocation()
    const navigate = useNavigate()
    const isLoginPage = location.pathname === '/';
    const logoutHandle = () => {
        localStorage.clear()
        navigate("/")
    }
    return (
        <>
            {
                !isLoginPage &&
                <div >
                    <div className="side-nav pt-5">
                        <img src={logo} width='50' />
                        <h6>Bridegfix Technology</h6><br />
                        <ul>
                            <li>
                                <Link to='/dashboard'>
                                    <div className='row textStyle'>
                                        <div className='col-sm-3'>
                                            <ComputerIcon sx={{ color: "#007bff " }} />
                                        </div>
                                        <div className='col-sm-9'>
                                            Dashboard
                                        </div>
                                    </div>
                                </Link>
                            </li>
                            <br />
                            <li>
                                <Link to='/employees'>
                                    <div className='row textStyle'>
                                        <div className='col-sm-3'>
                                            <PersonIcon sx={{ color: "#ffd600" }} />
                                        </div>
                                        <div className='col-sm-9'>
                                            Employee
                                        </div>
                                    </div>
                                </Link>

                            </li>
                            <hr></hr>
                            <p>Management</p>
                            <li>
                                <Link to='/leave'>
                                    <div className='row textStyle'>
                                        <div className='col-sm-3'>
                                            <BadgeIcon sx={{ color: "#fb6340" }} />
                                        </div>
                                        <div className='col-sm-9'>
                                            Leave
                                        </div>
                                    </div>
                                </Link>
                            </li><br />
                            <li>
                                <Link to='/payroll'>
                                    <div className='row textStyle'>
                                        <div className='col-sm-3'>
                                            <PaidIcon sx={{ color: "#2dce89" }} />
                                        </div>
                                        <div className='col-sm-9'>
                                            Payroll
                                        </div>
                                    </div>
                                </Link>
                            </li><br />
                            <li>
                                <Link to='/status'>
                                    <div className='row textStyle'>
                                        <div className='col-sm-3'>
                                            <PaidIcon sx={{ color: "#f5365c" }} />
                                        </div>
                                        <div className='col-sm-9'>
                                            Status
                                        </div>
                                    </div>
                                </Link>
                            </li>

                            <hr></hr>
                            <p>others</p>
                            <li onClick={logoutHandle} style={{cursor:"pointer"}}>
                                <div className='row textStyle'>
                                    <div className='col-sm-3'>
                                        <PowerSettingsNewIcon sx={{ color: "#f5365c" }} />
                                    </div>
                                    <div className='col-sm-9'>
                                        Logout
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            }
        </>
    )
}

export default SideNavBar
