import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

export default function AdminSubscriptionCard({ subscription }) {
  const [hidden, setHidden] = useState(true)

  const discounts = () => {
    return subscription.discounts.map((disc) => {
      return (
        <p>
          <span className='bold'>{disc.amount}%</span> off from all{' '}
          <i>{disc.class_name}</i> {disc.class_type} classes
        </p>
      )
    })
  }

  const newExpiration = (date) => {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const d = date.split('-')
    const newDate = `${d[2]} ${months[d[1].replace(/^0/, '') - 1]} ${d[0]}`
    return newDate
  }

  const remainedEntrances = () => {
    return subscription.entrances == '' ? (
      <p>
        <span className='bold blue'>No</span> remaining{' '}
        <span className='bold'>regular</span> entrances
      </p>
    ) : (
      subscription.entrances.map((entr) => {
        return (
          <p>
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
      subscription.free_entrances.map((entr) => {
        return (
          <p>
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
      <p style={{ fontSize: '15px' }}>
        <i>Expiration: {newExpiration(subscription.expiration_date)}</i>
      </p>
      <h4 style={{ marginTop: 0 }}>{subscription.name}</h4>
      <img
        style={{ width: '100px' }}
        src={`http://localhost/yoga/public/assets/subscriptions/${subscription.image}`}
        alt={`subscription ${subscription.image} image`}
      />
      <FontAwesomeIcon
        className='arrow'
        icon={hidden ? faChevronRight : faChevronDown}
        size='1x'
        onClick={() => setHidden(!hidden)}
      />
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
