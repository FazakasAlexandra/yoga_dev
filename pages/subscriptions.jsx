import Head from 'next/head'
import Link from 'next/link'
import DayScheduleCard from '../components/DayScheduleCard'
import Layout from '../components/Layout'
export default function Home() {
  return (
    <Layout activeTab={"subscriptions"}>
      <h1 style={{textAlign : 'center'}}>Subscriptions come here</h1>
    </Layout>
  )
}
