import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt, faVideo } from '@fortawesome/free-solid-svg-icons'
import db from '../db'

export default function EventCard({ event, adminInterface, deleteEvent }) {
  return (
    <div className='event-card'>
      <img
        src={`${db.baseURL}/public/assets/events/${event.image}`}
        style={{}}
      />
      <div className='event-details-section'>
        <div>
          <img src='/assets/logo.png' />
          {adminInterface == true ? (
            <button
              className='button-white delete-event'
              onClick={() => deleteEvent(event.id, event.image)}
            >
              <FontAwesomeIcon icon={faTrashAlt} size='2x' />
            </button>
          ) : (
            ''
          )}
        </div>
        <div className='event-details'>
          <div>
            <h1>{event.title}</h1>
            {event.link != '' ? (
              <a target="_blank" href={`http://${event.link}/`}>
                <FontAwesomeIcon
                  icon={faVideo}
                  size='lg'
                  style={{ cursor: 'pointer' }}
                  color="#3f7f9a"
                  className='info-icon'
                />{' '}
                {event.link}
              </a>
            ) : (
              ''
            )}
            <p>
              <span className='bold-text'>Location </span>
              <i>{event.location}</i>
            </p>
            <p>
              <span className='bold-text'>Date </span>{' '}
              <i>
                {new Date(event.date).toLocaleString('en-UK', {
                  weekday: 'long',
                  year: 'numeric',
                  day: 'numeric',
                  month: 'long',
                })}{' '}
                {event.hour ? `at ${event.hour}` : ''}
              </i>
            </p>
          </div>
          <p className='description'>{event.description}</p>
        </div>
      </div>
    </div>
  )
}
