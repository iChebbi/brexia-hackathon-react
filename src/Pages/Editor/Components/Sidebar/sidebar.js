import React from 'react'
import Dropzone from 'react-dropzone'

import './styles.scss'
import { addNodeToChart } from 'utils/flowchart'

export default function sidebar({ model, files, addFile, refreshRenderKey, updateSeletction }) {

  const randomCoordinates = (max, min) => Math.floor(Math.random() * (max - min)) + min

  const addFileNodeToChart = (e, file) => {
    e.stopPropagation()
    addNodeToChart(model, {
      name: file.name,
      color: 'blue',
      posX: randomCoordinates(900, 600),
      posY: randomCoordinates(600, 100),
      output: false,
      extras: {
        extension: file.extension,
        nodeType: 'file',
        columns: file.columns
      }
    }, updateSeletction)
    refreshRenderKey()
    console.log({ model })
  }

  const addTransformationNodeToChart = (name, color) => {
    addNodeToChart(model, {
      name, color,
      posX: randomCoordinates(600, 100),
      posY: randomCoordinates(600, 100),
      output: true,
      extras: {
        nodeType: 'transformation',
        transType: name
      }
    }, updateSeletction)
    refreshRenderKey()
    console.log({ model })
  }

  const renderFiles = (files) => files.map((file, key) => {
    const fileIcon = file.extension === 'csv' ? 'https://png.icons8.com/wired/50/000000/csv.png' : 'https://png.icons8.com/wired/50/000000/ms-excel.png'
    return (<button key={key} className='element' >
      <img onClick={e => addFileNodeToChart(e, file)} className='icon' src={fileIcon} alt={file.name} />
      <div className='element-title' >{file.name}</div>
    </button>)
  })

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
          {renderFiles(files)}
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
