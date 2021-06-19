export default function IndividualName(props) {
  return (
    <div className={`user-list-items ${props.classStyle}`}>
      <div>
        <span className='list-initial'>{props.name[0]}</span>
        <span className='list-name'>{props.name}</span>
      </div>
      <span
        id='arrow'
        onClick={() => {
          props.selectClient(props.id)
        }}
      >
        &lt;
      </span>
    </div>
  )
}
