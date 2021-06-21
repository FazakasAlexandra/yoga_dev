import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

export default function ClassCard({
  id,
  name,
  level,
  offprice,
  onprice,
  attend,
  deletion,
}) {
  return (
    <div className='class-card'>
      <div className='card-buttons'>
        <Link href={`/accounts/admin/classes/class_attendences/${id}`}>
          <a className='button-white' data-id={id}>
            <FontAwesomeIcon icon={faChartBar} size='lg' />
          </a>
        </Link>
        <button className='button-white' onClick={() => deletion(id)}>
          <FontAwesomeIcon icon={faTrashAlt} size='2x' />
        </button>
      </div>
      <div className='classCardDetails'>
        <p>
          <b>Class name:</b> {name}
        </p>
        <p>
          <b>Level:</b> {level}
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
