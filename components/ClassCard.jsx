import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons'


export default function ClassCard(props) {
    return (
        <div class="class-card">
            <div class="card-buttons">
                <Link href="#">
                    <a class="button-white">
                        <FontAwesomeIcon icon={faChartBar} size="lg" />
                    </a>
                </Link>
                <button class="dlt-button-white">
                    <FontAwesomeIcon icon={faTrashAlt} size="2x" />
                </button>
            </div>
            <div class="classCardDetails">
                <p><b>Class name:</b> {props.name}</p>
                <p><b>Offline price:</b> {props.offprice}</p>
                <p><b>Online price:</b> {props.onprice}</p>
                <p><b>Attendences:</b> {props.attend}</p>
            </div>
        </div>
    )
  }
  