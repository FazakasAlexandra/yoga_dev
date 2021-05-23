import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import db from '../db'
import _ from 'lodash'

export default function SubscriptionCard({ subscription, admin, removeSubscriptionCard }) {
    const { name, price, months, image, attendences, free_entrences, discounts, id, entrences } = subscription

    const getDiscounts = () => {
        return discounts.map(({ amount, class_type, class_name }) => {
            return <p key={_.uniqueId()}><b>{amount}%</b> off from all <i>{class_name} </i> {class_type} classes</p>
        })
    }

    const getFreeEntrances = () => {
        return free_entrences.map(({ amount, class_type, class_name }) => {
            return <p key={_.uniqueId()}><b>{amount} free</b> <span>{amount > 1 ? 'classes' : 'class'} for {class_type} <i>{class_name}</i></span></p>
        })
    }

    const getEntrences = () => {
        return entrences.map(({ amount, class_name, class_type}) => {
            return <p key={_.uniqueId()} style={{ marginTop: "0rem" }}><b>{amount}</b> entrences for {class_type} <i>{class_name}</i></p>
        })
    }

    const remove = () => {
        let yes = confirm(`Are you sure you want to delete ${name} subscription ?`);
        if (yes) {
            db.getJWT().then((jwt) => {
                db.subscriptions.removeSubscription(jwt, id).then((res) => {
                    removeSubscriptionCard(id)
                })
            })
        }
    }

    return (
        <div className="subscription-card">
            {admin ?
                <button className="dlt-button-white" onClick={remove}>
                    <FontAwesomeIcon
                        icon={faTrashAlt}
                        size="2x"
                    />
                </button>
                : null
            }
            <h1>{name}</h1>
            <img src={`http://localhost/yoga/public/assets/subscriptions/${image}`} alt={`subscription ${name} image`} />
            <div>
                <span className="price">{price}€</span>
                <span className="months"> / {months} {months > 1 ? 'months' : 'month'}</span>
            </div>
            <hr />
            {getEntrences()}
            {getDiscounts()}
            {getFreeEntrances()}
        </div>
    )
}
