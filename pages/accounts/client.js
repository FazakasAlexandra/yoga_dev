import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router'

export default function Page() {
    const router = useRouter()
    const [session, loading] = useSession()
    const [content, setContent] = useState()
    console.log('hi')

    useEffect(() => {
        if (!session) router.push({ pathname: '/' })
    }, [])

    // Fetch content from protected route
    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch('/api/examples/protected')
            const json = await res.json()
            if (json.content) { setContent(json.content) }
        }
        fetchData()
    }, [session])

    // When rendering client side don't display anything until loading is complete
    if (typeof window !== 'undefined' && loading) return null

    // If session exists, display content
    return (
        <Layout>
            <h1>Protected CLIENT Page</h1>
            <p><strong>{content || "\u00a0"}</strong></p>
        </Layout>
    )
}