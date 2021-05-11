import Link from 'next/link'

export default function IndividualName(props) {
    return (
        <div className="user-list-items">
            <div>
                <span className="list-initial">
                    A
            </span>
                <span className="list-name">
                    {props.name}
                </span>
            </div>
            <span onClick={() => props.seeDetails(props.id)}>
                &gt;
            </span>
        </div>
    )
}
