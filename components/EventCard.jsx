import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function EventCard({ event, adminInterface, deleteEvent }) {
  return (
    <div className='event-card'>
      <img
        src={`http://localhost/yoga/public/assets/events/${event.image}`}
        style={{}}
      />
      <div className='event-details-section'>
        <div>
          <img src='/assets/logo.png' />
          {adminInterface == true ? (
            <button
              className='button-white delete-event'
              onClick={() => deleteEvent(event.id, event.image)}
              style={{
                position: 'absolute',
                left: '88%',
                color: '#646262',
              }}
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
            <p>
              <span className='bold-text'>Location:</span>{' '}
              {event.link != '' ? (
                <a
                  href={`http://${event.link}/`}
                  passHref={true}
                  style={{ color: '#1518e8' }}
                  target='_blank'
                >
                  <i>{event.location}</i>
                </a>
              ) : (
                <i>{event.location}</i>
              )}
            </p>
            <p>
              <span className='bold-text'>Date:</span>{' '}
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
