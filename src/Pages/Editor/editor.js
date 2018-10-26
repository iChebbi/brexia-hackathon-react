import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'
import Button from '@material-ui/core/Button'

import Sidebar from './Components/Sidebar/index'
import Flowchart from 'Components/Flowchart'

import './styles.scss'
import SelectModal from './Components/SelectModal';

// Prepare flowchart engine
const engine = new SRD.DiagramEngine()
engine.installDefaultFactories()
const model = new SRD.DiagramModel()
engine.setDiagramModel(model)

//sample values
const columns = [
  'sqdd',
  'aaaaa',
  'ccccc',
  'ttttt',
  'opoo',
  'oppppp',
  'dsd'
]
export default class editor extends Component {

  state = {
    nodeIsSelected: false,
    files: [],
    selectModalIsOpen: false,
    modalData: {},
    instructions: []
  }

  updateSeletction = e => this.setState({ nodeIsSelected: e.isSelected && ['Select', 'Combine', 'GroupBy'].includes(e.entity.name) ? e.entity : null })
  refreshRenderKey = () => this.forceUpdate()

  editNodeHandler = () => {
    const { nodeIsSelected } = this.state
    switch (nodeIsSelected.name) {
      case 'Select':
        this.setState(prevState => ({ selectModalIsOpen: !prevState.selectModalIsOpen, modalData: nodeIsSelected }))
        break
      default:
    }
  }

  saveInstruction = (instruction, elementId) => {
    const newInstruction = { elementId, instruction }
    this.setState(prevState => ({ instructions: [...prevState.instructions, newInstruction] }))
  }

  addFile = e => {
    const [file] = e
    if (file.type !== 'text/csv' && (file.type.split('.')[1] && !file.type.split('.')[1].includes('xls'))) return
    const newFile = { name: file.name, type: file.type === 'text/csv' ? 'csv' : 'excel' }
    this.setState(prevState => ({ files: [...prevState.files, newFile] }))
  }

  render() {
    const { nodeIsSelected, files, renderKey, selectModalIsOpen, modalData } = this.state
    const sideBarProps = { model, addFile: this.addFile, files, refreshRenderKey: this.refreshRenderKey, updateSeletction: this.updateSeletction }
    const selectModalProps = { isOpen: selectModalIsOpen, toggleModal: this.editNodeHandler, modalData, saveInstruction: this.saveInstruction, columns }
    return (
      <div className='editor'>
        <Flowchart key={renderKey} engine={engine} />
        <Sidebar {...sideBarProps} />
        {nodeIsSelected && <Button onClick={this.editNodeHandler} className='edit-element'>Edit element</Button>}
        <SelectModal {...selectModalProps} />
      </div>
    )
  }
}
