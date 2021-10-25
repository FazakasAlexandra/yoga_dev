import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import db from '../db'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';

export default function Header({ activeTab }) {
  const [session, loading] = useSession()
  const [is_admin, setIsAdmin] = useState(false)
  const [menuOn, setMenuOn] = useState(true)
  const router = useRouter()
  const { t } = useTranslation();

  useEffect(() => {
    if (session) {
      db.users.queryUsers('email', session.user.email).then((res) => {
        if (!res.data) {
          db.getJWT().then((res) => {
            db.users.postUser({
              email: session.user.email,
              name: session.user.name,
              jwt: res.jwtToken,
            }).catch(err => {
              console.log(err)
            })
          }).catch(err => {
            console.log(err)
          })
        } else {
          if (res.data.is_admin === 'true') setIsAdmin(true)
        }
      })
    }
  }, [session])

  const login = (e) => {
    e.preventDefault()
    signIn("google")
  }

  const logout = async (e) => {
    e.preventDefault()

    const args = {}

    if (router.pathname.includes('accounts')) {
      args.callbackUrl = '/'
    }

    const data = await signOut(args)
    router.push(data.url)
  }

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className='signedInStatus'>
        <p
          className={`nojs-show ${!session && loading ? 'loading' : 'loaded'}`}
        >
          {!session && (
            <>
              <span className='notSignedInText'>{t("common:not logged in")}</span>
              <a
                href={`/api/auth/signin`}
                className='buttonPrimary'
                onClick={(e) => login(e)}
              >
                {t("common:log in")}
              </a>
            </>
          )}
          {session && (
            <>
              {session.user.image && (
                <span
                  style={{ backgroundImage: `url(${session.user.image})` }}
                  className='avatar'
                />
              )}
              <span className='signedInText'>
                <small>{t("common:logged in as")}</small>
                <br />
                <strong>{session.user.email || session.user.name}</strong>
              </span>
              <a
                href={`/api/auth/signout`}
                className='button'
                onClick={async (e) => logout(e)}
              >
                {t("common:log out")}
              </a>
            </>
          )}
        </p>
      </div>
      <nav>
        <div className='small-menu'>
          <Link href='/'>
            <img style={{cursor:"pointer"}} src='/assets/logo2.png' height="50px" width="fit-content" />
          </Link>
          <FontAwesomeIcon
            icon={faBars}
            size='2x'
            onClick={() => setMenuOn(!menuOn)}
          />
        </div>
        <ul className='navItems' style={{ display: menuOn ? 'flex' : 'none' }}>
          <li className='navItem'>
            <Link href='/blog'>
              <a className={activeTab === 'blog' || activeTab === 'post' ? 'active-tab' : null}>
                {t("common:blog")}
              </a>
            </Link>
          </li>
          <li className='navItem'>
            <Link href='/events'>
              <a className={activeTab === 'events' ? 'active-tab' : null}>
                {t("common:events")}
              </a>
            </Link>
          </li>
          <li className='navItem'>
            <FontAwesomeIcon
              icon={faCalendarAlt}
              style={{ marginRight: '0.5rem', fontSize: '1.6rem' }}
            />
            <Link href='/weekSchedule'>
              <a
                className={activeTab === 'week_schedule' ? 'active-tab' : null}
              >
                {t("common:week schedule")}
              </a>
            </Link>
          </li>
          <li className='navItem'>
            <Link href='/subscriptions'>
              <a
                className={activeTab === 'subscriptions' ? 'active-tab' : null}
              >
                {t("common:subscriptions")}
              </a>
            </Link>
          </li>
          {session && !is_admin ? (
            <li className='navItem'>
              <Link href='/accounts/client/bookings'>
                <a className={activeTab === 'account' ? 'active-tab' : null}>
                  {t("common:account")}
                </a>
              </Link>
            </li>
          ) : null}
          {session && is_admin ? (
            <li className='navItem'>
              <Link href='/accounts/admin/clients'>
                <a className={activeTab === 'account' ? 'active-tab' : null}>
                  {t("common:account")}
                </a>
              </Link>
            </li>
          ) : null}
        </ul>
      </nav>
    </header>
  )
}