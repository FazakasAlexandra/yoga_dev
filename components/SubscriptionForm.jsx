import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faCheck } from '@fortawesome/free-solid-svg-icons'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { useEffect, useState } from 'react'
import db from '../db'
import { theme } from '../utilities.js'
import SubscriptionFormInputs from './SubscriptionFormInputs'
import _ from 'lodash'


export default function subscriptionsForm({
  removeForm,
  addNewSubscriptionCard,
  id,
}) {
  const [image, setImage] = useState('')
  const [yogaClasses, setYogaClasses] = useState([])
  const [months, setMonths] = useState(0)
  const [price, setPrice] = useState(0)
  const [subscriptionName, setName] = useState('')
  const [entrences, setEntrences] = useState([])
  const [discounts, setDiscounts] = useState([])
  const [free_entrences, setFreeEntrences] = useState([])

  useEffect(() => {
    db.classes.getClasses().then((res) => setYogaClasses(res.data))
  }, [])

  const getEntrencesList = () => {
    return entrences.map(({ amount, class_name, class_type }) => {
      return (
        <li key={_.uniqueId()}>
          <b>{amount}</b> entrences for {class_type} <i>{class_name}</i> classes
        </li>
      )
    })
  }

  const getFreeEntrencesList = () => {
    return free_entrences.map(({ amount, class_name, class_type }) => {
      return (
        <li key={_.uniqueId()}>
          <b>{amount} free</b> {amount > 1 ? 'classes' : 'class'} for{' '}
          {class_type} <i>{class_name}</i>
        </li>
      )
    })
  }

  const getDiscountsList = () => {
    return discounts.map(({ amount, class_name, class_type }) => {
      return (
        <li key={_.uniqueId()}>
          <b>{amount} %</b> off from all <i>{class_name}</i> {class_type}{' '}
          classes
        </li>
      )
    })
  }

  const addNewSubscription = () => {
    const newSubscription = {
      name: subscriptionName,
      months,
      price,
      image,
      discounts,
      free_entrences,
      entrences,
    }

    db.getJWT().then((jwt) => {
      db.subscriptions.postSubscription(newSubscription, jwt).then((res) => {
        addNewSubscriptionCard(res.data)
        removeForm(id)
      })
    })
  }

  function handleFileInputChange(e) {
    const reader = new FileReader()
    reader.readAsDataURL(e.target.files[0])
    reader.addEventListener('load', () => {
      setImage(reader.result)
    })
  }

  return (
    <div className='subscription-card form'>
      <div className='buttons-container'>
        <button
          className='button-white checked'
          onClick={() => addNewSubscription()}
        >
          <FontAwesomeIcon icon={faCheck} size='2x' />
        </button>
        <button className='dlt-button-white' onClick={() => removeForm(id)}>
          <FontAwesomeIcon icon={faTrashAlt} size='2x' />
        </button>
      </div>
      <div className='form-body'>
        <TextField
          id='standard-basic'
          label='Subscription Name'
          variant='outlined'
          value={subscriptionName}
          style={{ width: '100%' }}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor='upload-photo' style={{ marginTop: '1rem' }}>
          <input
            style={{ display: 'none' }}
            id='upload-photo'
            name='upload-photo'
            type='file'
            onChange={(e) => handleFileInputChange(e)}
            accept='image/png, image/jpeg, image/jpg'
          />
          <Button
            color='primary'
            variant='contained'
            component='span'
            style={{ width: '190px' }}
          >
            Upload Picture
          </Button>
        </label>
        <img
          src={image || `${db.baseURL}/public/assets/subscriptions/icon.png`}
        />
        <div className='nr-inputs'>
          <TextField
            id='standard-basic'
            label='Months'
            variant='outlined'
            type='number'
            style={{ width: '100%' }}
            onChange={(e) => setMonths(e.target.value)}
          />
          <TextField
            id='standard-basic'
            label='Price €'
            variant='outlined'
            type='number'
            style={{ width: '100%' }}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <hr />
        <SubscriptionFormInputs
          buttonText='entrences'
          yogaClasses={yogaClasses}
          fieldText='entrences'
          addSelection={(entrance) => setEntrences([...entrences, entrance])}
          selectionList={getEntrencesList()}
        />
        <hr />
        <SubscriptionFormInputs
          buttonText='free entrences'
          yogaClasses={yogaClasses}
          fieldText='entrences'
          addSelection={(freeEntrence) =>
            setFreeEntrences([...free_entrences, freeEntrence])
          }
          selectionList={getFreeEntrencesList()}
        />
        <hr />
        <SubscriptionFormInputs
          buttonText='discount'
          yogaClasses={yogaClasses}
          fieldText='discount %'
          addSelection={(discount) => setDiscounts([...discounts, discount])}
          selectionList={getDiscountsList()}
        />
      </div>
    </div>
  )
}
