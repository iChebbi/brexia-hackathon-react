import React from 'react'
import { DiagramWidget } from 'storm-react-diagrams'

import './styles.scss'
require("storm-react-diagrams/dist/style.min.css");

export default function flowchart({ engine }) {
  return (
    <div className='flowchart'>
      <DiagramWidget maxNumberPointsPerLink={0} diagramEngine={engine} />
    </div>
  )
}
