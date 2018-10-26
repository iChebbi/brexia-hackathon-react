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
    operations: []
  }

  filteredColumns = (colmuns, keyword) => {
    if (!colmuns) return []
    if (!keyword) return colmuns
    return colmuns.filter(e => e.includes(keyword))
  }

  addOperation = e => {
    e.persist()
    this.setState(prevState => ({ operations: [...prevState.operations, e.target.innerText] }))
  }

  removeOperation = (e, key) => {
    const newOperations = this.state.operations
    newOperations.splice(key, 1)
    this.setState({ operations: newOperations })
  }

  saveHandler = () => {
    const { saveInstruction, modalData, toggleModal } = this.props
    const { operations } = this.state
    saveInstruction(operations.join(' '), modalData.id)
    toggleModal()
  }

  render() {
    const { isOpen, toggleModal, columns } = this.props
    const { searchKeyword, operations } = this.state
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
          <DialogContent>
            <div className='select-modal-content' >
              <div className='columns'>
                <input type='text' onChange={e => this.setState({ searchKeyword: e.target.value })} />
                {this.filteredColumns(columns, searchKeyword).map((el, key) => <span key={key}>
                  <input type='checkbox' />
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
              </div>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }
}
