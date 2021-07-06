import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import db from '../db'
import _ from 'lodash'

export default function SubscriptionCard({
  subscription,
  admin,
  removeSubscriptionCard,
}) {
  const {
    name,
    price,
    months,
    image,
    free_entrences,
    discounts,
    id,
    entrences,
  } = subscription

  const getDiscounts = () => {
    return discounts.map(({ amount, class_type, class_name }) => {
      return (
        <p key={_.uniqueId()}>
          <b>{amount}</b>
          <b className='percent'>%</b> off from <i> {class_name} </i>
          {class_type === 'online' ? 'online' : ''}
        </p>
      )
    })
  }

  const getFreeEntrances = () => {
    return free_entrences.map(({ amount, class_type, class_name }) => {
      return (
        <p key={_.uniqueId()}>
          <b>
            {amount} <span className='free'>free </span>
          </b>
          <i>{class_name} </i>
          {class_type === 'online' ? 'online ' : ''}
          {amount > 1 ? ' entrences' : ' entrence'}
        </p>
      )
    })
  }

  const getEntrences = () => {
    return entrences.map(({ amount, class_name, class_type }) => {
      return (
        <p key={_.uniqueId()} style={{ marginTop: '0rem' }}>
          <b>{amount}</b> <i>{class_name}</i>
          {class_type === 'online' ? 'online' : ''}
          {amount > 1 ? ' entrences' : ' entrece'}
        </p>
      )
    })
  }

  const remove = () => {
    let yes = confirm(`Are you sure you want to delete ${name} subscription ?`)
    if (yes) {
      db.getJWT().then((jwt) => {
        db.subscriptions.removeSubscription(jwt, id, image).then((res) => {
          removeSubscriptionCard(id)
        })
      })
    }
  }

  return (
    <div className='subscription-card'>
      {admin ? (
        <button className='dlt-button-white' onClick={remove}>
          <FontAwesomeIcon icon={faTrashAlt} size='2x' />
        </button>
      ) : null}
      <h1>{name}</h1>
      <img
        src={`${db.baseURL}/public/assets/subscriptions/${image}`}
        alt={`subscription ${name} image`}
      />
      <div>
        <span className='price'>
          {price}
          <span className='euro'>€</span>
        </span>
        <span className='months'>
          {' '}
          / {months} {months > 1 ? 'months' : 'month'}
        </span>
      </div>
      <hr />
      <div className='content'>
        <div style={{ marginBottom: '2.5rem' }}>
          <h3>Entrences</h3>
          {getEntrences()}
          {getFreeEntrances()}
        </div>
        <div>
          <h3>Discounts</h3>
          {getDiscounts()}
        </div>
      </div>
    </div>
  )
}
