import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'
import Button from '@material-ui/core/Button'

import Sidebar from './Components/Sidebar/index'
import Flowchart from 'Components/Flowchart'

import './styles.scss'
import SelectModal from './Components/SelectModal';
import { getPreviousNodeColumns, getPreviousNode } from 'utils/flowchart';

// Prepare flowchart engine
const engine = new SRD.DiagramEngine()
engine.installDefaultFactories()
const model = new SRD.DiagramModel()
engine.setDiagramModel(model)
console.log({ model })

export default class editor extends Component {

  state = {
    nodeIsSelected: false,
    files: [
      {
        name: 'Shit.csv',
        extension: 'csv',
        columns: [
          'shitCsqdd',
          'shitCaaaaa',
          'shitCccccc',
          'shitCttttt',
          'shitCopoo',
          'shitCoppppp',
          'shitCdsd'
        ]
      },
      {
        name: 'Crap.xlsx',
        extension: 'xlsx',
        columns: [
          'Crapsqdd',
          'Crapaaaaa',
          'CrapCccccc',
          'Crapttttt',
          'Crapopoo',
          'Crapoppppp',
          'Crapdsd'
        ]
      },
    ],
    selectModalIsOpen: false,
    modalData: {},
    instructions: []
  }

  updateSeletction = e => this.setState({ nodeIsSelected: e.isSelected && ['Select', 'Combine', 'GroupBy'].includes(e.entity.name) ? e.entity : null })
  refreshRenderKey = () => this.forceUpdate()

  editNodeHandler = () => {
    const { nodeIsSelected } = this.state
    const previousNode = getPreviousNode(nodeIsSelected)[0]
    const sourceName = previousNode.extras.nodeType === 'file' ? previousNode.name : previousNode.id
    const columns = getPreviousNodeColumns(previousNode)
    switch (nodeIsSelected.name) {
      case 'Select':
        this.setState(prevState => ({ selectModalIsOpen: !prevState.selectModalIsOpen, modalData: { ...nodeIsSelected, columns, sourceName: sourceName } }))
        break
      default:
    }
  }

  addFile = e => {
    const [file] = e
    if (file.type !== 'text/csv' && (file.type.split('.')[1] && !file.type.split('.')[1].includes('xls'))) return
    const newFile = { name: file.name, type: file.type === 'text/csv' ? 'csv' : 'xlsx' }
    this.setState(prevState => ({ files: [...prevState.files, newFile] }))
  }

  render() {
    const { nodeIsSelected, files, renderKey, selectModalIsOpen, modalData } = this.state
    const sideBarProps = { model, addFile: this.addFile, files, refreshRenderKey: this.refreshRenderKey, updateSeletction: this.updateSeletction }
    const selectModalProps = { isOpen: selectModalIsOpen, toggleModal: this.editNodeHandler, modalData, model }
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
