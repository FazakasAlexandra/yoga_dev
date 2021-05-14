import Link from 'next/link'

export default function AdminLayout({ children, activeTab }) {
  return (
    <div className="admin-layout">

      <div className="header">
        <Link href="/accounts/admin/clients">
          <a className={activeTab === "clients" ? "active-tab" : null}>
            Clients
          </a>
        </Link>

        <Link href="/accounts/admin/classes/list">
          <a className={activeTab === "classes" ? "active-tab" : null}>
            Classes
          </a>
        </Link>

        <Link href="/accounts/admin/subscriptions">
          <a className={activeTab === "subscriptions" ? "active-tab" : null}>
            Subscriptions
          </a>
        </Link>
      </div>

      <hr />

      {children}
    </div>
  )
}
