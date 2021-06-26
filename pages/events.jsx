import Layout from '../components/Layout'
import EventCard from '../components/EventCard'
import { useState, useEffect } from 'react'
import db from '../db.js'
import { useSession } from 'next-auth/client'

export default function Events() {
  const [session, loading] = useSession()
  const [events, setEvents] = useState([])

  useEffect(() => {
    if (!loading && !session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.events
      .getUpcomingEvents(new Date().toJSON().slice(0, 10))
      .then((res) => {
        setEvents(res.data)
      })
  }, [])

  const getEvents = () => {
    return events.map((event, index) => {
      return <EventCard key={index} event={event} adminInterface={false} />
    })
  }

  return (
    <Layout activeTab={'events'}>
      <div className='events-layout'>{getEvents()}</div>
    </Layout>
  )
}
