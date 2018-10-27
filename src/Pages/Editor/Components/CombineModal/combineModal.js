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
    searchKeyword: '',
    input: '',
    operations: [],
    checkedColumns: {},
    tableRows: [
      {
        input1: 'Test111',
        input2: 'Test222',
      },
      {
        input1: 'Test111',
        input2: 'Test222',
      }
    ]
  }

  filteredColumns = (colmuns, keyword) => {
    if (!colmuns) return []
    if (!keyword) return colmuns
    return colmuns.filter(e => e.includes(keyword))
  }

  addOperation = e => {
    e.persist()
    const operation = e.target.innerText === 'add' ? this.state.input : e.target.innerText
    this.setState(prevState => ({ operations: [...prevState.operations, operation], input: '' }))
  }

  removeOperation = (e, key) => {
    const newOperations = this.state.operations
    newOperations.splice(key, 1)
    this.setState({ operations: newOperations })
  }

  saveHandler = () => {
    const { modalData, toggleModal } = this.props
    const { operations, checkedColumns } = this.state
    const columns = Object.keys(checkedColumns).map(el => el).join(', ') //build comma separated column list
    const query = `SELECT ${columns} FROM ${modalData.firstSourceName} ${operations.join(' ')}` //build query
    console.log({ modalData })
    console.log(this.props.model)
    this.props.model.nodes[modalData.id].extras = {
      outColumn: checkedColumns,
      query
    }
    toggleModal()
  }

  handleCheckbox = e => {
    const newCheckedColumns = this.state.checkedColumns
    newCheckedColumns[e.target.name] = e.target.checked
    this.setState({ checkedColumns: newCheckedColumns })
  }

  render() {
    const { isOpen, toggleModal, modalData } = this.props
    const { searchKeyword, tableRows, checkedColumns } = this.state
    console.log({ modalData })

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
                {this.filteredColumns(modalData.columns, searchKeyword).map((el, key) => <span key={key}>
                  <input checked={checkedColumns[el]} name={el} type='checkbox' onChange={this.handleCheckbox} />
                  {' ' + el}
                </span>)}

              </div>
              <div className='input'>

                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell>INPUT 1</TableCell>
                      <TableCell>INPUT 2</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableRows.map((row, key) => {
                      return (
                        <TableRow key={key}>
                          <TableCell>{row.input1}</TableCell>
                          <TableCell>{row.input2}</TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>

              </div>

              <div className='columns'>

                <input type='text' className='input-select' onChange={e => e.persist() || this.setState({ searchKeyword: e.target.value })} />
                {this.filteredColumns(modalData.secondColumns, searchKeyword).map((el, key) => <span key={key}>
                  <input checked={checkedColumns[el]} name={el} type='checkbox' onChange={this.handleCheckbox} />
                  {' ' + el}
                </span>)}

              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
