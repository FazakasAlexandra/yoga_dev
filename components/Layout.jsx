import Header from './Header'
import Head from 'next/head'
/* import Footer from '../components/footer' */

export default function Layout({ children, activeTab }) {
    return (
        <>
            <Head>
                <title>Yoga</title>
                <link rel="icon" href="/assets/logo.png" />
            </Head>
            <Header activeTab={activeTab}/>
            <main className={activeTab}>
                {children}
            </main>
        </>
    )
}