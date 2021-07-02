import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

export default function Loader({ text }) {
    return (
        <>
            <FontAwesomeIcon size='2x' icon={faSpinner} spin />
            <p style={{fontSize: "18px"}}>{text || 'Loading...'}</p>
        </>
    )
}