import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'
import Button from '@material-ui/core/Button'

import Sidebar from './Components/Sidebar/index'
import Flowchart from 'Components/Flowchart'

import './styles.scss'

// Prepare flowchart engine
const engine = new SRD.DiagramEngine()
engine.installDefaultFactories()
const model = new SRD.DiagramModel()
engine.setDiagramModel(model)


export default class editor extends Component {


  state = {
    nodeIsSelected: false,
    files: [],
  }

  refreshRenderKey = () => this.forceUpdate()

  addFile = e => {
    const [file] = e
    console.log({ e })
    if (file.type !== 'text/csv' && (file.type.split('.')[1] && !file.type.split('.')[1].includes('xls'))) return
    const newFile = {
      name: file.name,
      type: file.type === 'text/csv' ? 'csv' : 'excel'
    }
    this.setState(prevState => ({ files: [...prevState.files, newFile] }))
  }

  render() {

    const { nodeIsSelected, files, renderKey } = this.state
    const sideBarProps = { model, addFile: this.addFile, files, refreshRenderKey: this.refreshRenderKey }
    return (
      <div className='editor'>
        <Flowchart key={renderKey} engine={engine} />
        <Sidebar {...sideBarProps} />
        {nodeIsSelected && <Button className='edit-element'>Edit element</Button>}
      </div>
    )
  }
}
