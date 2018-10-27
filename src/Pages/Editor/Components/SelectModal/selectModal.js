import React, { Component } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Dialog from '@material-ui/core/Dialog'
import Button from '@material-ui/core/Button'
import DialogContent from '@material-ui/core/DialogContent'
import Chip from '@material-ui/core/Chip';

import './styles.scss'

export default class selectModal extends Component {

  state = {
    searchKeyword: '',
    input: '',
    operations: [],
    checkedColumns: {}
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
    const query = `SELECT ${columns} FROM ${modalData.sourceName} ${operations.join(' ')}` //build query
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
    const { searchKeyword, operations, checkedColumns } = this.state
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
                <div>
                  <div className="row">
                    {operations.map((el, key) => <Chip onClick={e => this.removeOperation(e, key)} key={key} className='column' label={el} />)}
                  </div>
                </div>
              </div>
              <div className='operations'>

                <div className='row'>
                  <Chip onClick={this.addOperation} className='column' label='AND' />
                  <Chip onClick={this.addOperation} className='column' label='OR' />
                  <Chip onClick={this.addOperation} className='column' label='NOT' />
                </div>

                <div className='row'>
                  <Chip onClick={this.addOperation} className='column' label='LIKE' />
                  <span onClick={this.addOperation} className='column' />
                  <Chip onClick={this.addOperation} className='column' label='WHERE' />
                </div>

                <div className='row'>
                  <Chip onClick={this.addOperation} className='column' label='=' />
                  <Chip onClick={this.addOperation} className='column' label='>' />
                  <Chip onClick={this.addOperation} className='column' label='<' />
                  <Chip onClick={this.addOperation} className='column' label='<>' />
                </div>

                <div className='row'>
                  <Chip onClick={this.addOperation} className='column' label='>=' />
                  <span className='column' />
                  <Chip onClick={this.addOperation} className='column' label='<=' />
                </div>

                <div className='row'>
                  <Chip onClick={this.addOperation} className='column' label='AVG' />
                  <Chip onClick={this.addOperation} className='column' label='MIN' />
                  <Chip onClick={this.addOperation} className='column' label='MAX' />
                </div>

                <div className='row'>
                  <Chip onClick={this.addOperation} className='column' label='(' />
                  <Chip onClick={this.addOperation} className='column' label='+' />
                  <Chip onClick={this.addOperation} className='column' label='-' />
                  <Chip onClick={this.addOperation} className='column' label='*' />
                  <Chip onClick={this.addOperation} className='column' label='/' />
                  <Chip onClick={this.addOperation} className='column' label=')' />
                </div>

                <div className="row">
                  <input onChange={e => e.persist() || this.setState({ input: e.target.value })} type="text" className='column input-select' />
                  <Chip onClick={this.addOperation} label='add' />
                </div>

              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
