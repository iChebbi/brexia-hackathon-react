import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import './styles.scss'

export default class combineModal extends Component {

  state = {
    searchKeywordOne: '',
    searchKeywordTwo: '',
    inputOne: [],
    inputTwo: []
  }

  filteredColumns = (colmuns, keyword) => {
    if (!colmuns) return []
    if (!keyword) return colmuns
    return colmuns.filter(e => e.includes(keyword))
  }

  removeInput = (num, key) => {
    const newInput = this.state[`input${num}`]
    newInput.splice(key, 1)
    this.setState({ [`input${num}`]: newInput })
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

  addInput = (num, e) => {
    this.setState(prevState => ({ [`input${num}`]: [...prevState[`input${num}`], e] }))
  }

  render() {
    const { isOpen, toggleModal, modalData } = this.props
    const { searchKeywordOne, searchKeywordTwo, inputOne, inputTwo } = this.state

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
                <input type='text' className='input-select' onChange={e => e.persist() || this.setState({ searchKeywordOne: e.target.value })} />
                {this.filteredColumns(modalData.columns, searchKeywordOne).map((el, key) => <div key={key} onClick={e => this.addInput('One', el)} >{el}</div>)}
              </div>
              <div className='input'>

                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>INPUT 1</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inputOne.map((el, key) => {
                      return (<TableRow key={key} onClick={() => this.removeInput('One', key)} >
                        <TableCell>{el}</TableCell>
                      </TableRow>)
                    })}
                  </TableBody>
                </Table>

                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>INPUT 2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {inputTwo.map((el, key) => {
                      return (<TableRow key={key} onClick={() => this.removeInput('Two', key)} >
                        <TableCell>{el}</TableCell>
                      </TableRow>)
                    })}
                  </TableBody>
                </Table>

              </div>

              <div className='columns'>

                <input type='text' className='input-select' onChange={e => e.persist() || this.setState({ searchKeywordTwo: e.target.value })} />
                {this.filteredColumns(modalData.secondColumns, searchKeywordTwo).map((el, key) => <div key={key} onClick={e => this.addInput('Two', el)} >{el}</div>)}

              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
