import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'

import Sidebar from 'Components/Sidebar/index'
import Flowchart from 'Components/flowchart'

import './styles.scss'

// Prepare flowchart engine
const engine = new SRD.DiagramEngine();
engine.installDefaultFactories();
const model = new SRD.DiagramModel();
engine.setDiagramModel(model);


export default class editor extends Component {
  addToFlowChart = (nodes = []) => model.addAll(...nodes);

  componentDidMount() {

    //sample node elements
    const node1 = new SRD.DefaultNodeModel("Node 1", "rgb(0,192,255)");
    const port1 = node1.addOutPort("Out");
    node1.setPosition(100, 100);

    const node2 = new SRD.DefaultNodeModel("Node 2", "rgb(192,255,0)");
    const port2 = node2.addInPort("In");
    node2.setPosition(400, 100);

    const link1 = port1.link(port2);
    this.addToFlowChart([node1, node2, link1])

  }
  render() {
    return (
      <div className='editor'>
        <Flowchart engine={engine} />
        <Sidebar />
      </div>
    )
  }
}
