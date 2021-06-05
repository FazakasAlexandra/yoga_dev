import { useState, useEffect } from 'react'

export default function IndividualName(props) {
  return (
    <div className={`user-list-items ${props.newClass}`}>
      <div>
        <span className='list-initial'>A</span>
        <span className='list-name'>{props.name}</span>
      </div>
      <span
        id='arrow'
        onClick={(e) => {
          props.selectClient(props.id)
          props.changeClass(e)
        }}
      >
        &lt;
      </span>
    </div>
  )
}
