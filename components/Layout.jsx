import Header from './Header'
/* import Footer from '../components/footer' */


export default function Layout({ children, activeTab }) {
    return (
        <>
            <Header activeTab={activeTab}/>
            <main className={`${activeTab}-main`}>
                {children}
            </main>
        </>
    )
}