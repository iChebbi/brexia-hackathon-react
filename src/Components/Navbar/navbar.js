import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import './styles.scss'

export default function navbar() {
  return (
    <div>
      <AppBar className='navbar' position="static">
        <Button color='inherit'>Run</Button>
        <Button color='inherit'>Preview</Button>
      </AppBar>
    </div>
  )
}
