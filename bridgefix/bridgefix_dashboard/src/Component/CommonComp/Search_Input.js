import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import './commonComp.css'

export default function Search_Input() {
    const localData = localStorage.getItem('employee_profile')
    return (
        <div style={{ display: "flex", justifyContent: "end", alignItems: "center" }}>
            {/* <div className="search-container">
                <button className="search-button">
                    <SearchIcon sx={{ color: '#5c6166' }} />
                </button>
                <input type="text" placeholder="Search" className="search-input" />
            </div> */}
            <div style={{ color: "white" }}>
                {localData ? <div><AccountCircleIcon /> {localData}</div> : null}
            </div>

        </div>
    )
}
