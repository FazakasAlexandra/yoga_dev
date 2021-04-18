import Header from './Header'
import Head from 'next/head'
/* import Footer from '../components/footer' */
import { useSession } from 'next-auth/client'
import { useEffect } from 'react/cjs/react.development'

export default function Layout({ children, activeTab }) {
    const [session, loading] = useSession()
    return (
        <>
            <Head>
                <title>Yoga</title>
                <link rel="icon" href="/assets/logo.png" />
            </Head>
            <Header activeTab={activeTab}/>
            <main>
                {children}
            </main>
        </>
    )
}