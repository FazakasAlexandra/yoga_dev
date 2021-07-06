import db from '../db'

export default function Feedback({ message, iconName }) {
  return (
    <div className='feedback'>
      <img src={`${db.baseURL}/public/assets/${iconName}.svg`} />
      <p>{message}</p>
    </div>
  )
}
