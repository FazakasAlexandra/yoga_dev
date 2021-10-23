import React, { useState } from 'react'

export const BaseButton = ({
    buttonClass,
    active,
    reversed,
    ...props
  }) => {
    const [hover, setHover] = useState(false)
    return (
      <div className="base-button">
        <button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onMouseOver={() => setHover(true)}
          style={{
            backgroundColor: active || (hover && props.hoverEffect) ? '#e6d7f5' : 'inherit',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
          {...props}
          ref={props.ref}
        ></button>
        {
          hover && props.label && <span style={{
            textAlign: "center",
            position: 'absolute',
            bottom: '-50px',
            left: '0px',
            backgroundColor: 'white',
            boxShadow: "0px 9px 61px rgb(0 0 0 / 25%)",
            borderRadius: '5px',
            width: '120px'
          }}
          >
            {props.label}
          </span> || null}
      </div>
    )
  }

BaseButton.displayName = 'BaseButton';
