import AdminSubscriptionCard from '../components/AdminSubscriptionCard'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import { useEffect, useState } from 'react'
import db from '../db'

export default function AdminClientSubscriptionSection({
  listSub,
  reloadClientInfo,
  subscriptions,
  clientid,
}) {
  const [selectedSub, setSelectedSub] = useState('')

  const addSubs = (user, sub) => {
    db.getJWT().then((jwt) => {
      console.log(jwt)
      db.subscriptions.postSubscriptionToUser(jwt, user, sub).then((res) => {
        console.log(res.data)
      })
    })
  }

  const subscriptionList = () => {
    return listSub.map((sub) => {
      return (
        <MenuItem value={sub.id} style={{ background: 'white' }}>
          {sub.name}
        </MenuItem>
      )
    })
  }

  const handleChange = (event) => {
    setSelectedSub(event.target.value)
  }

  const listOfCards = () => {
    return subscriptions.map((sub) => {
      return <AdminSubscriptionCard subscription={sub} />
    })
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
