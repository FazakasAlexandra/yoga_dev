import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faTimesCircle,
  faTimes,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
import IndividualName from '../components/IndividualName'
import ClientsInfo from '../components/ClientsInfo'

export default function AdminClients({ myclients, listSub }) {
  const [clients, setClients] = useState(myclients)
  const [client, setClient] = useState(myclients[0])
  const [icon, setIcon] = useState(faSearch)
  
  const clientsDisplayNr = 10
  const [limitListClients, setLimitListClients] = useState(clientsDisplayNr)
  const [limitReached, setLimitReached] = useState(false)

  useEffect(() => {
    const elements = document.querySelectorAll('.client-search .user-list-items').length
    elements < limitListClients && elements > clientsDisplayNr ? setLimitReached(true) : ''
  }, [limitListClients])

  const selectClient = (id) => {
    const selectedClient = clients.find((client) => +client.id === +id)
    setClient(selectedClient)
  }

  const updateClients = (updatedClient) => {
    const updatedClients = clients.map((client) => {
      if (+client.id === +updatedClient.id) return updatedClient
      return client
    })
    setClients(updatedClients)
    setClient(updatedClient)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    if (icon == faTimesCircle) {
      setClients(myclients)
      setIcon(faSearch)
      event.target[0].value = ''
    } else {
      setClients(clients.filter(({ name }) => name.toLowerCase().includes(event.target[0].value.toLowerCase())))
      setIcon(faTimesCircle)
    }
  }

  const listNames = () => {
    return clients.slice(0, limitListClients).map((cl) => {
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

        <form className='form-users' onSubmit={handleSearch}>
          <input type='text' id='user-search' name='search' />
          <button type='submit'>
            <FontAwesomeIcon
              icon={icon}
              style={{ color: '#646262', fontSize: '150%' }}
            />
          </button>
        </form>

        <div className='users-list'>{listNames()}</div>

        <div className='container' style={{ marginTop: '1rem' }}>
          {
            !limitReached && clients.length > limitListClients ?
              <FontAwesomeIcon icon={faEllipsisH} className='info-icon' size="2x" color="#8D8D8D"
                onClick={() => setLimitListClients(limitListClients + clientsDisplayNr)}
              />
              : clients.length > clientsDisplayNr ?
              <FontAwesomeIcon icon={faTimes} className='info-icon' size="lg" color="#8D8D8D"
                onClick={() => {
                  setLimitListClients(clientsDisplayNr)
                  setLimitReached(false)
                }}
              /> : null
          }
        </div>

      </div>
      <div className='client-info'>
        <ClientsInfo
          client={client}
          setClient={updateClients}
          listSub={listSub}
        />
      </div>
    </div>
  )
}
