import React from 'react'

function Logo({width = '100px'}) {
  return (
    <img src="public/logo.svg" alt="logo" width={width}/>
  )
}

export default Logo