import React from 'react'
import './styles.scss'

export default function sidebar() {
  return (
    <div className='sidebar'>
      <div className='section'>
        <div className='title'>Transformations</div>
        <div className='elements-column'>
          <div className='element'>Select</div>
          <div className='element'>Combine</div>
          <div className='element'>GroupBy</div>
        </div>
      </div>
      <div className='section'>
        <div className='title'>Datasets</div>
        <div className='elements-grid'>
          <div className="element">File</div>
          <div className="element">File</div>
          <div className="element">File</div>
          <div className="element">File</div>
          <div className="element">File</div>
        </div>
      </div>
    </div>
  )
}
