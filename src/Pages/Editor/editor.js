import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'
import Button from '@material-ui/core/Button'

import Sidebar from './Components/Sidebar/index'
import Flowchart from 'Components/Flowchart'

import SelectModal from './Components/SelectModal';
import CombineModal from './Components/CombineModal/combineModal';
import { getNodeColumns, getPreviousNode } from 'utils/flowchart';

import './styles.scss'
import { uploadFile } from 'utils/testUtils';

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
        name: 'testFile.csv',
        extension: 'csv',
        columns: [
          'Csqdd',
          'Caaaaa',
          'Cccccc',
          'Cttttt',
          'Copoo',
          'Coppppp',
          'Cdsd'
        ]
      },
      {
        name: 'TestFile.xlsx',
        extension: 'xlsx',
        columns: [
          'Testsqdd',
          'Testaaaaa',
          'TestCccccc',
          'Testttttt',
          'Testopoo',
          'Testoppppp',
          'Testdsd'
        ]
      },
    ],
    selectModalIsOpen: false,
    combineModalIsOpen: false,
    modalData: {},
    instructions: []
  }

  updateSeletction = e => this.setState({ nodeIsSelected: e.isSelected && ['Select', 'Combine', 'GroupBy'].includes(e.entity.name) ? e.entity : null })
  refreshRenderKey = () => this.forceUpdate()

  editNodeHandler = () => {
    const { nodeIsSelected } = this.state
    const previousNodes = getPreviousNode(nodeIsSelected)

    console.log({ previousNodes })

    const firstPreviousNode = getPreviousNode(nodeIsSelected)[0]
    const firstSourceName = firstPreviousNode ? firstPreviousNode.extras.nodeType === 'file' ? firstPreviousNode.name
      : firstPreviousNode.id
      : {}


    const columns = getNodeColumns(firstPreviousNode)
    switch (nodeIsSelected.name) {
      case 'Select':
        this.setState(prevState => ({
          selectModalIsOpen: !prevState.selectModalIsOpen,
          modalData: {
            ...nodeIsSelected,
            columns,
            firstNourceName: firstSourceName
          }
        }))
        break
      case 'Combine':
        const secondPreviousNode = getPreviousNode(nodeIsSelected)[1]
        const secondSourceName = secondPreviousNode ? secondPreviousNode.extras.nodeType === 'file' ? secondPreviousNode.name
          : secondPreviousNode.id
          : {}
        const secondPreviousNodecolumns = getNodeColumns(secondPreviousNode)
        this.setState(prevState => ({
          combineModalIsOpen: !prevState.combineModalIsOpen,
          modalData: {
            ...nodeIsSelected,
            columns,
            secondColumns: secondPreviousNodecolumns,
            firstSourceName,
            secondSourceName
          }
        }))
        break
      default:
    }
  }

  addFile = e => {
    console.log('dropzone', { files: e })
    const [file] = e

    uploadFile(file)
    if (file.type !== 'text/csv' && (file.type.split('.')[1] && !file.type.split('.')[1].includes('xls'))) return
    const newFile = { name: file.name, type: file.type === 'text/csv' ? 'csv' : 'xlsx' }
    this.setState(prevState => ({ files: [...prevState.files, newFile] }))
  }

  render() {
    const { nodeIsSelected, files, renderKey, selectModalIsOpen, combineModalIsOpen, modalData } = this.state
    const sideBarProps = { model, addFile: this.addFile, files, refreshRenderKey: this.refreshRenderKey, updateSeletction: this.updateSeletction }
    const selectModalProps = { isOpen: selectModalIsOpen, toggleModal: this.editNodeHandler, modalData, model }
    const combineModalProps = { isOpen: combineModalIsOpen, toggleModal: this.editNodeHandler, modalData, model }

    return (
      <div className='editor'>
        <Flowchart key={renderKey} engine={engine} />
        <Sidebar {...sideBarProps} />
        {nodeIsSelected && <Button onClick={this.editNodeHandler} className='edit-element'>Edit element</Button>}
        <SelectModal {...selectModalProps} />
        <CombineModal {...combineModalProps} />
      </div>
    )
  }
}
