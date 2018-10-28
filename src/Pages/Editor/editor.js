import React, { Component } from 'react'
import Button from '@material-ui/core/Button'

import Sidebar from './Components/Sidebar/index'
import Flowchart from 'Components/Flowchart'

import SelectModal from './Components/SelectModal';
import CombineModal from './Components/CombineModal/combineModal';
import { getNodeColumns, getPreviousNode } from 'utils/flowchart';

import './styles.scss'
import { uploadFile } from 'utils/testUtils';

export default class editor extends Component {

  state = {
    nodeIsSelected: false,
    files: [ // Mock files data for testing purposes
      {
        name: 'testFile.csv',
        extension: 'csv',
        columns: ['Csqdd', 'Caaaaa', 'Cccccc', 'Cttttt', 'Copoo', 'Coppppp', 'Cdsd']
      },
      {
        name: 'TestFile.xlsx',
        extension: 'xlsx',
        columns: ['Testsqdd', 'Testaaaaa', 'TestCccccc', 'Testttttt', 'Testopoo', 'Testoppppp', 'Testdsd'
        ]
      },
    ],
    selectModalIsOpen: false,
    combineModalIsOpen: false,
    groupByModalIsOpen: false,
    modalData: {},
    instructions: []
  }

  updateSeletction = e => this.setState({ nodeIsSelected: e.isSelected && ['Select', 'Combine', 'GroupBy'].includes(e.entity.name) ? e.entity : null })
  refreshRenderKey = () => this.forceUpdate()

  editNodeHandler = () => {
    const { nodeIsSelected } = this.state

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
            firstSourceName: firstSourceName
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
      case 'GroupBy':
        this.setState(prevState => ({
          groupByModalIsOpen: !prevState.groupByModalIsOpen,
          modalData: {
            ...nodeIsSelected,
            columns,
            firstSourceName: firstSourceName
          }
        }))
        break
      default:
    }
  }

  addFile = async e => {
    const [file] = e

    if (file.type !== 'text/csv' && (file.type.split('.')[1] && !file.type.split('.')[1].includes('xls'))) return
    const type = file.type === 'text/csv' ? 'csv' : 'xlsx'

    const columns = await uploadFile(file.name.split('.')[0], type)
    console.log({ columns })
    if (columns.length > 0) {
      const newFile = { name: file.name, extension: type, columns }
      this.setState(prevState => ({ files: [...prevState.files, newFile] }))
    }
  }

  render() {
    const { nodeIsSelected, files, renderKey, selectModalIsOpen, combineModalIsOpen, modalData } = this.state
    const { model, engine } = this.props
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
