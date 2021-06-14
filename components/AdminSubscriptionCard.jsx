import { useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../utilities.js'
import db from '../db'

export default function AdminSubscriptionCard({ subscription, reloadClientInfo }) {
  const [hidden, setHidden] = useState(true)
  console.log(subscription)
  const discounts = () => {
    return subscription.discounts.map((disc) => {
      return (
        <p>
          <span style={{ fontWeight: 'bolder' }}>{disc.amount}%</span> off from
          all <i>{disc.class_name}</i> {disc.class_type} classes
        </p>
      )
    })
  }

  const removeUserSubscription = () => {
    db.getJWT().then(({ jwtToken }) => {
      db.subscriptions.removeUserSubscription(subscription.usersSubscriptionID, jwtToken).then((res) => {
        console.log(res)
        reloadClientInfo()
      })
    })
  }

  const getDate = (date) => {
    return (
      <span className="date">
        <span>Expires on </span>
        <b>{date.day} {date.month} {date.year}</b>
      </span>
    )
  }

  return (
    <div className='admin-subscription-card'>
      <h4>{subscription.name}</h4>
      {getDate(formatDate(subscription.expiration_date))}
      <img
        style={{ width: '100px' }}
        src={`http://localhost/yoga/public/assets/subscriptions/${subscription.image}`}
        alt={`subscription ${subscription.image} image`}
      />
      <div className="footer">
        <FontAwesomeIcon className="arrow" icon={hidden ? faChevronRight : faChevronDown} size='1x' onClick={() => setHidden(!hidden)} />
        <span onClick={removeUserSubscription}>Remove</span>
      </div>
      {
        !hidden ?
          <div>
            <p>
              <span style={{ color: '#5E54AC', fontWeight: 'bolder' }}>
                {subscription.remainedEntrances
                  ? subscription.remainedEntrances
                  : 'Not remaining'}
              </span>{' '}
              entrances
            </p>
            <p>
              <span style={{ color: '#5E54AC', fontWeight: 'bolder' }}>
                {subscription.remainedFreeEntrances}
              </span>{' '}
              free entrances
            </p>
            {discounts()}
          </div>
          : null
      }
    </div>
  )
}
