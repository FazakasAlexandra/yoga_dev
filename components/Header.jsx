import Link from 'next/link'
import { signIn, signOut, useSession, getSession } from 'next-auth/client'
import { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Image from 'next/image'
import db from '../db'
import { useState } from 'react'

export default function Header({ activeTab }) {
  const [session, loading] = useSession()
  const [is_admin, setIsAdmin] = useState(false)
  const [menuOn, setMenuOn] = useState(true)

  useEffect(() => {
    if (session) {
      fetch('http://localhost:3000/api/examples/jwt').then(res => res.json()).then(res => {
        if (res) queryUser(res)
      })
    }
  }, [session])

  function queryUser(res) {
    const jwt = res.jwtToken

    db.queryUsers('jwt', jwt).then((res) => {
      if (!res.data) {
        db.postUser({
          email: session.user.email,
          name: session.user.name,
          jwt
        })
      } else {
        session.user = { ...session.user, ...res.data };
        console.log(session)
        if (res.data.is_admin === 'true') setIsAdmin(true)
      }
    })
  }

  return (
    <header>
      <noscript>
        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>
      </noscript>
      <div className="signedInStatus">
        <p className={`nojs-show ${(!session && loading) ? "loading" : "loaded"}`}>
          {!session && <>
            <span className="notSignedInText">You are not signed in</span>
            <a
              href={`/api/auth/signin`}
              className="buttonPrimary"
              onClick={(e) => {
                e.preventDefault()
                signIn()
              }}
            >
              Sign in
                  </a>
          </>}
          {session && <>
            {session.user.image && <span style={{ backgroundImage: `url(${session.user.image})` }} className="avatar" />}
            <span className="signedInText">
              <small>Signed in as</small><br />
              <strong>{session.user.email || session.user.name}</strong>
            </span>
            <a
              href={`/api/auth/signout`}
              className="button"
              onClick={(e) => {
                e.preventDefault()
                signOut()
              }}
            >
              Sign out
            </a>
          </>}
        </p>
      </div>
      <nav>
        <div className="small-menu">
          <Image
            src="/assets/logo.png"
            height={60}
            width={60}
          />
          <FontAwesomeIcon icon={faBars} size="2x" onClick={()=>setMenuOn(!menuOn)}/>
        </div>
        <ul className="navItems" style={{display: menuOn ? "flex" : "none"}}>
          <li className="navItem">
            <Link href="/">
              <a className={activeTab === "home" ? "active-tab" : null}>Home</a>
            </Link>
          </li>
          <li className="navItem">
            <Link href="/weekSchedule">
              <a className={activeTab === "week_schedule" ? "active-tab" : null}>Week Schedule</a>
            </Link>
          </li>
          <li className="navItem">
            <Link href="/subscriptions"><a className={activeTab === "subscriptions" ? "active-tab" : null}>Subscriptions</a>
            </Link>
          </li>
          {
            session && !is_admin ?
              <li className="navItem">
                <Link href="/accounts/client/bookings">
                  <a className={activeTab === "account" ? "active-tab" : null}>Account</a>
                </Link>
              </li> : null
          }
          {
            session && is_admin ?
              <li className="navItem">
                <Link href="/accounts/admin/clients">
                  <a className={activeTab === "account" ? "active-tab" : null}>Account</a>
                </Link>
              </li> : null
          }
        </ul>
      </nav>
    </header>
  )
}
