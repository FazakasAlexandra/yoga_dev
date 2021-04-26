import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import ClassCard from '../../../../components/ClassCard'
import db from '../../../../db.js'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [classesData, setClassesData] = useState([])

    useEffect(() => {
        if (!session) router.push({ pathname: '/' })
    }, [session])

    useEffect(() => {
        db.classes.getClasses().then(res => setClassesData(res.data))
    }, [])

    const deleteClass = (id) => {
        db.classes.deleteClass(id)
        db.classes.getClasses().then(res => setClassesData(res.data))
    }

    const classesCards = () => {
        return classesData.map((classesData) => {
          return <ClassCard
            key={classesData.id}
            id={classesData.id}
            name={classesData.name}
            offprice={classesData.offline_price}
            onprice={classesData.online_price}
            attend="170"
            deletion={deleteClass}
          />
        })
    }

    return (
        <Layout activeTab={"account"}>
            <AdminLayout activeTab={"classes"}>
                <AdminClassesLayout activeTab={"list"}>
                    {classesCards()}
                </AdminClassesLayout>
            </AdminLayout>
        </Layout>
    )
}