import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { formatDate } from '../utilities.js'
import db from '../db'

export default function AdminSubscriptionCard({
  subscription,
  reloadClientInfo,
}) {
  const [hidden, setHidden] = useState(true)

  const discounts = () => {
    return subscription.discounts.map((disc, index) => {
      return (
        <p key={index}>
          <span className='bold'>{disc.amount}%</span> off from all{' '}
          <i>{disc.class_name}</i> {disc.class_type} classes
        </p>
      )
    })
  }

  const removeUserSubscription = () => {
    db.getJWT().then(({ jwtToken }) => {
      db.subscriptions
        .removeUserSubscription(subscription.usersSubscriptionID, jwtToken)
        .then((res) => {
          reloadClientInfo()
        })
    })
  }

  const getDate = (date) => {
    return (
      <span className='date'>
        <span>Expires on </span>
        <b>
          {date.day} {date.month} {date.year}
        </b>
      </span>
    )
  }

  const remainedEntrances = () => {
    return subscription.entrances == '' ? (
      <p>
        <span className='bold blue'>No</span> remaining{' '}
        <span className='bold'>regular</span> entrances
      </p>
    ) : (
      subscription.entrances.map((entr, index) => {
        return (
          <p key={index}>
            <span className='bold blue'>{entr.remained_entrances}</span>{' '}
            remained entrances for{' '}
            <span className='bold'>{entr.class_type}</span>{' '}
            <i>{entr.class_name}</i> class
          </p>
        )
      })
    )
  }

  const remainedFreeEntrances = () => {
    return subscription.free_entrances == '' ? (
      <p>
        <span className='bold blue'>No</span> remaining{' '}
        <span className='bold'>free</span> entrances
      </p>
    ) : (
      subscription.free_entrances.map((entr, index) => {
        return (
          <p key={index}>
            <span className='bold blue'>{entr.remained_entrances}</span> free
            entrances for <span className='bold'>{entr.class_type}</span>{' '}
            <i>{entr.class_name}</i> class
          </p>
        )
      })
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
      <div className='footer'>
        <FontAwesomeIcon
          className='arrow'
          icon={hidden ? faChevronRight : faChevronDown}
          size='1x'
          onClick={() => setHidden(!hidden)}
        />
        <span onClick={removeUserSubscription}>Remove</span>
      </div>
      {!hidden ? (
        <div>
          {remainedEntrances()}
          <hr />
          {remainedFreeEntrances()}
          <hr />
          {discounts()}
        </div>
      ) : null}
    </div>
  )
}
