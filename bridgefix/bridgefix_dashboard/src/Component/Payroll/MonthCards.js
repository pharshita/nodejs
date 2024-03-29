import React from 'react'
import './Payroll.css'
export default function MonthCards() {
    let arr = [
        {
            date: "Sep 2023", days: "1 sep-30 sep", status: "Completed",
        },
        {
            date: "Oct 2023", days: "1 Oct-31 Oct", status: "Completed",
        },
        {
            date: "Nov 2023", days: "1 Nov-30 Nov", status: "Completed",
        },
        {
            date: "Dec 2023", days: "1 Dec-31 Dec", status: "Completed",
        },
        {
            date: "Jan 2024", days: "1 Jan-31 Jan", status: "Completed",
        },
        {
            date: "Feb 2024", days: "1 Feb-29 Feb", status: "Current",
        },
        {
            date: "Mar 2024", days: "1 Mar-31 Mar", status: "Upcoming",
        },
        {
            date: "Apr 2024", days: "1 Apr-30 Apr", status: "Upcoming",
        },
        {
            date: "May 2024", days: "1 May-31 May", status: "Upcoming",
        },
        {
            date: "Jun 2024", days: "1 June-30 June", status: "Upcoming",
        },
        {
            date: "Jul 2024", days: "1 Jul-31 Jul", status: "Upcoming",
        },
        {
            date: "Aug 2024", days: "1 Aug-31 Aug", status: "Upcoming",
        },
    ]
    return (
        <div className='container'>
            <div className='row cardcontaint'>
                {
                    arr.map((item, index) => {
                        return (
                            <div key={index}>
                                <h6>{item.date}</h6>
                                <p>{item.days}</p>
                                <button style={{border:"none",color:"white", background: (item.status === "Completed") ? "#007BFF" : (item.status === "Current") ? "#28A745" : "#6c757d" }}>{item.status}</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
