import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';

export default function AdminLayout({ children, activeTab }) {
  const [headerMenu, setHeaderMenu] = useState(false);

  return (
    <div className='admin-layout'>
      <div className='header'>
        <Link href='/accounts/admin/clients'>
          <a className={activeTab === 'clients' ? 'active-tab' : null}>
            Clients
          </a>
        </Link>

        <Link href='/accounts/admin/classes/list'>
          <a className={activeTab === 'classes' ? 'active-tab' : null}>
            Classes
          </a>
        </Link>

        <Link href='/accounts/admin/events'>
          <a className={activeTab === 'events' ? 'active-tab' : null}>Events</a>
        </Link>

        <Link href='/accounts/admin/subscriptions'>
          <a className={activeTab === 'subscriptions' ? 'active-tab' : null}>
            Subscriptions
          </a>
        </Link>
        <Link href='/accounts/admin/blog'>
          <a className={activeTab === 'blog' ? 'active-tab' : null}>
            Blog
          </a>
        </Link>
      </div>

      <div
        className="mobile-header"
        onClick={() => setHeaderMenu(true)}
      >
        <FontAwesomeIcon
          icon={faBars}
          size='lg'
        />
        <a className="active-tab">{activeTab}</a>
      </div>
      <Dialog
        fullScreen
        open={headerMenu}
        className="header-menu"
      >
        <FontAwesomeIcon
          className="close"
          icon={faTimes}
          size='1x'
          onClick={() => setHeaderMenu(false)}
        />

        <div className="dialog-content">
          <Link href='/accounts/admin/clients'>
            <a className={activeTab === 'clients' ? 'active-tab' : null}>
              Clients
            </a>
          </Link>

          <Link href='/accounts/admin/classes/list'>
            <a className={activeTab === 'classes' ? 'active-tab' : null}>
              Classes
            </a>
          </Link>

          <Link href='/accounts/admin/events'>
            <a className={activeTab === 'events' ? 'active-tab' : null}>Events</a>
          </Link>

          <Link href='/accounts/admin/subscriptions'>
            <a className={activeTab === 'subscriptions' ? 'active-tab' : null}>
              Subscriptions
            </a>
          </Link>
          <Link href='/accounts/admin/blog'>
            <a className={activeTab === 'blog' ? 'active-tab' : null}>
              Blog
            </a>
          </Link>
        </div>
      </Dialog>
      {children}
    </div>
  )
}