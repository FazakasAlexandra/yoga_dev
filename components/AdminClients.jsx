//import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import IndividualName from '../components/IndividualName'
import db from '../db'
import Chart from 'react-google-charts'

export default function AdminClients() {
    //const users = ['Alexandra Fazakas', 'Hirtop Laura', 'Damian Mihai'];
    const router = useRouter()
    const [session, loading] = useSession()
    const [clients, setClients] = useState([])

    const pieOptions = {
        title: "",
        slices: [
          {
            color: "#33d460"
          },
          {
            color: "#ff5d23"
          },
          {
            color: "#c32121"
          }
        ],
        legend: {
            position: "right",
            alignment: "start",
            textStyle: {
            color: "#646262",
            fontSize: 16
          }
        },
        pieSliceText: 'none',
        tooltip: {
          showColorCode: true
        },
        chartArea: {
          left: 0,
          top: 20,
          width: "100%",
          height: "65%"
        },
        fontName: "Roboto"
      };

    useEffect(() => {
        if (!session) router.push({ pathname: '/' })
    }, [session])

    useEffect(() => {
        db.users.getClients().then(res => setClients(res.data))
    }, [])

    const seeDetails = (id) => {
        console.log(id)
    }

    const listNames = () => {
        return clients.map((client) => {
            return <IndividualName
                key={client.id}
                id={client.id}
                name={client.name}
                seeDetails={seeDetails}/>
        })
    }

    return (
        <div className="admin-clients">
            <div className="client-search">
                <form className="form-users" action="/" method="get">
                    <input
                        type="text"
                        id="user-search"
                        name="search" 
                    />
                    <button type="submit">
                        <FontAwesomeIcon icon={faSearch} size="lg" />
                    </button>
                </form>
                <div className="users-list">
                    {listNames()}
                </div>
            </div>
            <div className="client-info">
                <div className="client-chart">
                    <h3>Attendence</h3>
                    <Chart
                    width={'400px'}
                    //height={'400px'}
                    chartType="PieChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Classes', 'Attendence'],
                        ['Attended classes', 24],
                        ['Canceled Classes', 2],
                        ['Absent Classes', 10]
                    ]}
                        options={pieOptions}
                    rootProps={{ 'data-testid': '7' }}
                    />
                </div>
                <div className="client-active-booking">
                    <h3>Active Bookings</h3>
                    <div className="active-booking-card">
                        <div className="active-bookings-numbers">
                            <p>7:30</p>
                            <p>25 lei</p>
                        </div>
                        <div className="active-bookings-details">
                            <p>Monday</p>
                            <p>Morning Yoga</p>
                            <p>online</p>
                        </div>
                        <div className="active-bookings-status">
                            <button>Present</button>
                            <button>Absent</button>
                        </div>
                    </div>
                    <div className="active-booking-card">
                        <div className="active-bookings-numbers">
                            <p>17:35</p>
                            <p>25 lei</p>
                        </div>
                        <div className="active-bookings-details">
                            <p>Friday</p>
                            <p>Yoga for intermediates and bla bla bla</p>
                            <p>online</p>
                        </div>
                        <div className="active-bookings-status">
                            <button>Present</button>
                            <button>Absent</button>
                        </div>
                    </div>
                </div>
                <div className="client-last-booking">
                    <h3>Last Booking</h3>
                    <p>2020/12/02</p>
                    <p>Yoga for intermediates</p>
                </div>
            </div>
        </div>
    )
}
