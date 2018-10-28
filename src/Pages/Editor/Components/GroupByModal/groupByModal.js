import PropTypes from 'prop-types'
import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'

import './styles.scss'

export default class combineModal extends Component {

  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    modalData: PropTypes.object.isRequired,
    model: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired
  }

  state = {
    searchKeyword: '',
    groupByColumns: [
      "dqsdqs",
      "dqsdqs",
      "dqsdqs",
      "dqsdqs"
    ],
    aggregateColumns: [
      "dddd",
      "dddd",
      "dddd",
      "dddd",
    ],
    inputOne: [],
  }

  filteredColumns = (colmuns, keyword) => {
    if (!colmuns) return []
    if (!keyword) return colmuns
    return colmuns.filter(e => e.includes(keyword))
  }

  removeInput = (col, key) => {
    const newInput = this.state[`${col}`]
    newInput.splice(key, 1)
    this.setState({ [`${col}`]: newInput })
  }

  saveHandler = () => {
    const { modalData, toggleModal, model } = this.props
    const { inputOne, inputTwo } = this.state

    const arr = inputOne.length >= inputTwo.length ? inputOne : inputTwo
    const combineTuples = arr.map((e, key) => [inputOne[key], inputTwo[key]])

    const outColumn = [...new Set(modalData.columns.concat(modalData.secondColumns))]

    model.nodes[modalData.id].extras = { outColumn, transformation: 'Combine', tuples: combineTuples }
    toggleModal()
  }

  addInput = (num, e) => this.setState(prevState => ({ [`input${num}`]: [...prevState[`input${num}`], e] }))

  render() {
    const { isOpen, toggleModal, modalData } = this.props
    const { searchKeyword, groupByColumns } = this.state

    return (
      <div >
        <Dialog
          className='select-modal'
          fullScreen
          open={isOpen}
        >
          <AppBar >
            <Toolbar>
              <Button color='inherit' onClick={toggleModal} label='Close'>
                Close
              </Button>
              <Button color='inherit' onClick={this.saveHandler}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <DialogContent className='select-diaglog'>
            <div className='select-modal-content' >
              <div className='columns'>
                <input type='text' className='input-select' onChange={e => e.persist() || this.setState({ searchKeyword: e.target.value })} />
                {this.filteredColumns(modalData.columns, searchKeyword).map((el, key) => <div key={key} onClick={e => this.addInput('One', el)} >{el}</div>)}
              </div>

              <div className='columns'>
                {groupByColumns.map((el, key) => <div key={key} onClick={e => this.removeInput('groupByColumns', key)} >{el}</div>)}
              </div>

              <div className='input'>



              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
