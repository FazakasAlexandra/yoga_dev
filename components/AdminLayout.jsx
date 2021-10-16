import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { useTranslation } from 'next-i18next';

export default function AdminLayout({ children, activeTab }) {
  const [headerMenu, setHeaderMenu] = useState(false);
  const { t } = useTranslation();

  return (
    <div className='admin-layout'>
      <div className='header'>
        <Link href='/accounts/admin/clients'>
          <a className={activeTab === 'clients' ? 'active-tab' : null}>
            {t("common:clients")}
          </a>
        </Link>

        <Link href='/accounts/admin/classes/list'>
          <a className={activeTab === 'classes' ? 'active-tab' : null}>
            {t("common:classes")}
          </a>
        </Link>

        <Link href='/accounts/admin/events'>
          <a className={activeTab === 'events' ? 'active-tab' : null}>
            {t("common:events")}
          </a>
        </Link>

        <Link href='/accounts/admin/subscriptions'>
          <a className={activeTab === 'subscriptions' ? 'active-tab' : null}>
            {t("common:subscriptions")}
          </a>
        </Link>
        <Link href='/accounts/admin/blog'>
          <a className={activeTab === 'blog' ? 'active-tab' : null}>
            {t("common:blog")}
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
              {t("common:clients")}
            </a>
          </Link>

          <Link href='/accounts/admin/classes/list'>
            <a className={activeTab === 'classes' ? 'active-tab' : null}>
              {t("common:classes")}
            </a>
          </Link>

          <Link href='/accounts/admin/events'>
            <a className={activeTab === 'events' ? 'active-tab' : null}>
              {t("common:events")}

            </a>
          </Link>

          <Link href='/accounts/admin/subscriptions'>
            <a className={activeTab === 'subscriptions' ? 'active-tab' : null}>
              {t("common:subscriptions")}

            </a>
          </Link>
          <Link href='/accounts/admin/blog'>
            <a className={activeTab === 'blog' ? 'active-tab' : null}>
              {t("common:blog")}
            </a>
          </Link>
        </div>
      </Dialog>
      {children}
    </div>
  )
}