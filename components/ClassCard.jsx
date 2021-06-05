import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function ClassCard({
  id,
  name,
  offprice,
  onprice,
  attend,
  deletion,
}) {
  const newTo = {
    pathname: '/accounts/admin/classes/class_attendences',
    param: { id },
  }
  return (
    <div className='class-card'>
      <div className='card-buttons'>
        <Link href={newTo}>
          <a className='button-white' data-id={id}>
            <FontAwesomeIcon icon={faChartBar} size='lg' />
          </a>
        </Link>
        <button className='dlt-button-white' onClick={() => deletion(id)}>
          <FontAwesomeIcon icon={faTrashAlt} size='2x' />
        </button>
      </div>
      <div className='classCardDetails'>
        <p>
          <b>Class name:</b> {name}
        </p>
        <p>
          <b>Offline price:</b> {offprice}
        </p>
        <p>
          <b>Online price:</b> {onprice}
        </p>
        <p>
          <b>Attendences:</b> {attend}
        </p>
      </div>
    </div>
  )
}
