//import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import IndividualName from '../components/IndividualName'
import ClientsInfo from '../components/ClientsInfo'

export default function AdminClients({ myclients }) {
  const [clients, setClients] = useState(myclients)
  const [client, setClient] = useState(myclients[0])
  const [icon, setIcon] = useState(faSearch)

  const selectClient = (id) => {
    const selectedClient = clients.find(client => +client.id === +id)
    setClient(selectedClient)
  }

  const updateClients = (updatedClient) => {
    const updatedClients = clients.map(client => {
      if (+client.id === +updatedClient.id) return updatedClient
      return client
    })
    setClients(updatedClients)
    setClient(updatedClient)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (icon == faTimesCircle) {
      setClients(myclients)
      setIcon(faSearch)
      event.target[0].value = ''
    } else {
      setClients(clients.filter(({ name }) => name.includes(event.target[0].value)))
      setIcon(faTimesCircle)
    }
  }

  const listNames = () => {
    return clients.map((cl) => {
      return (
        <IndividualName
          key={cl.id}
          id={cl.id}
          name={cl.name}
          selectClient={selectClient}
          classStyle={+client.id === +cl.id ? 'classSelected' : 'classNotSelected'}
        />
      )
    })
  }

  return (
    <div className='admin-clients'>
      <div className='client-search'>
        <form className='form-users' onSubmit={handleSubmit} method='get'>
          <input type='text' id='user-search' name='search' />
          <button type='submit'>
            <FontAwesomeIcon
              icon={icon}
              style={{ color: '#646262', fontSize: '150%' }}
            />
          </button>
        </form>
        <div className='users-list'>{listNames()}</div>
      </div>
      <div className='client-info'>
        <ClientsInfo client={client} setClient={updateClients} />
      </div>
    </div>
  )
}
