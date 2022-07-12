import React from 'react'

export default function Loader(props) {
  return (
    <div className={props.fixed ? `loader-wrapper fixed ${props.addClass}` : `loader-wrapper ${props.addClass}`}>
      <div className="loader"><div></div><div></div></div>
    </div>
  )
}
