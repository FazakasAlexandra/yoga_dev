import AdminSubscriptionCard from '../components/AdminSubscriptionCard'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { useState } from 'react'
import db from '../db'

export default function AdminClientSubscriptionSection({
  listSub,
  reloadClientInfo,
  subscriptions,
  clientid,
  clientName
}) {
  const [selectedSub, setSelectedSub] = useState('')

  const addSubs = (user, sub) => {
    db.getJWT().then((jwt) => {
      db.subscriptions.postSubscriptionToUser(jwt, user, sub).then((res) => {
        reloadClientInfo()
      })
    })
  }

  const subscriptionList = () => {
    return listSub.map((sub) => {
      return (
        <MenuItem key={sub.id} value={sub.id} style={{ background: 'white' }}>
          {sub.name}
        </MenuItem>
      )
    })
  }

  const handleChange = (event) => {
    setSelectedSub(event.target.value)
  }

  const listOfCards = () => {
    if(subscriptions.length) {
      return subscriptions.map((sub) => {
        return (
          <AdminSubscriptionCard
            key={sub.usersSubscriptionID}
            subscription={sub}
            reloadClientInfo={reloadClientInfo}
          />
        )
      })
    }
    return <i style={{margin: '0.5rem 0rem 1rem'}}>{clientName} has no subscriptions</i>
  }

  return (
    <>
      <div className='comboform'>
        <h3>Subscriptions</h3>
        <FormControl variant='outlined' className='subscriptionform'>
          <InputLabel margin='dense'>Subscription</InputLabel>
          <Select
            value={selectedSub ?? ''}
            name='selectSubs'
            className='comboSubs'
            onChange={handleChange}
          >
            {subscriptionList()}
          </Select>
          <button
            type='submit'
            onClick={() => addSubs(clientid.id, selectedSub)}
          >
            +
          </button>
        </FormControl>
      </div>
      <div className='adminsubsection'>{listOfCards()}</div>
    </>
  )
}
