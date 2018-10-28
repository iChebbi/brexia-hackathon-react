import PropTypes from 'prop-types'
import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import './styles.scss'
import { sortGraph } from 'utils/flowchart';

export default function navbar({ model, toggleViewMode }) {

  const traversGraph = () => sortGraph(model)
  return (
    <div>
      <AppBar className='navbar' position="static">
        <Button color='inherit' onClick={traversGraph} >Run</Button>
        <Button color='inherit' onClick={toggleViewMode}>Preview</Button>
      </AppBar>
    </div>
  )
}

navbar.propTypes = {
  model: PropTypes.object.isRequired
}