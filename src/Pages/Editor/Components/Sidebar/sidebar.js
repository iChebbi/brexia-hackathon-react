import React from 'react'
import Dropzone from 'react-dropzone'

import './styles.scss'
import { addNodeToChart } from 'utils/flowchart'

export default function sidebar({ model, files, addFile, refreshRenderKey }) {

  const addFileNodeToChart = (e) => {
    addNodeToChart(model, { name: e.target.name, color: 'blue', posX: 200, posY: 200, output: false })
    refreshRenderKey()
  }

  const addTransformationNodeToChart = (name, color) => {
    addNodeToChart(model, { name, color, posX: 200, posY: 200, output: true })
    refreshRenderKey()
  }

  return (
    <div className='sidebar'>
      <div className='section'>
        <div className='title'>Transformations</div>
        <div className='elements-column'>
          <button onClick={() => addTransformationNodeToChart('Select', 'red')} className='element'>Select</button>
          <button onClick={() => addTransformationNodeToChart('Combine', 'green')} className='element'>Combine</button>
          <button onClick={() => addTransformationNodeToChart('GroupBy', 'orange')} className='element'>GroupBy</button>
        </div>
      </div>
      <div className='section'>
        <div className='title'>Datasets</div>
        <div className='elements-grid'>
          {files.map((file, key) => <button key={key} name={file.name} onClick={addFileNodeToChart} className="element">{file.name}</button>)}
        </div>
        <div className="dropzone-container">
          <Dropzone
            onDrop={addFile}
            onFileDialogCancel={() => console.log('cancel')}
          >
            Drag files here
          </Dropzone>
        </div>
      </div>
    </div>
  )
}
