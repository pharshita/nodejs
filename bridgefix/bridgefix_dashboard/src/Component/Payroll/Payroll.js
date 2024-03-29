import React from 'react'
import Search_Input from '../CommonComp/Search_Input'
import './Payroll.css'
import MonthCards from './MonthCards'

function Payroll() {
    return (
        <div>
            <div className='payrollStyle'>
                <Search_Input />
            </div>
            <div className='cardStyle m-4 '>
                <MonthCards />
            </div>
            <hr />
            <div>
                
            </div>
        </div>
    )
}

export default Payroll
