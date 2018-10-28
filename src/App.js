import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'

import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './Components/Navbar'
import Editor from './Pages/Editor/index';

// Prepare flowchart engine
const engine = new SRD.DiagramEngine()
engine.installDefaultFactories()
const model = new SRD.DiagramModel()
engine.setDiagramModel(model)

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline >
          <Navbar model={model} />
          <Editor model={model} engine={engine} />
        </CssBaseline>
      </div>
    )
  }
}

export default App;
