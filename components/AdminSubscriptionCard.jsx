export default function AdminSubscriptionCard({ subscription }) {
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

  console.log(subscription.usersSubscriptionID)

  return (
    <div className='admin-subscription-card'>
      <h4>{subscription.name}</h4>
      <img
        style={{ width: '100px' }}
        src={`http://localhost/yoga/public/assets/subscriptions/${subscription.image}`}
        alt={`subscription ${subscription.image} image`}
      />
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
    </div>
  )
}
