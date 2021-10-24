import Header from './Header'
/* import Footer from '../components/footer' */
import Head from "next/head";

export default function Layout({ children, activeTab }) {
    return (
        <>
{/*             <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head> */}
            <Header activeTab={activeTab} />
            <main className={`${activeTab}-main`}>
                {children}
            </main>
        </>
    )
}