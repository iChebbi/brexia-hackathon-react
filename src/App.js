import React, { Component } from 'react'
import * as SRD from 'storm-react-diagrams'

import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './Components/Navbar'
import Editor from './Pages/Editor/index';
import Preview from 'Pages/Preview';

// Prepare flowchart engine
const engine = new SRD.DiagramEngine()
engine.installDefaultFactories()
const model = new SRD.DiagramModel()
engine.setDiagramModel(model)


class App extends Component {
  state = { previewMode: false }

  toggleViewMode = () => this.setState(prevState => ({ previewMode: !prevState.previewMode }))

  render() {
    const { previewMode } = this.state
    return (
      <div className="App">
        <CssBaseline >
          <Navbar model={model} toggleViewMode={this.toggleViewMode} />
          {previewMode ?
            <Preview /> :
            <Editor model={model} engine={engine} />}
        </CssBaseline>
      </div>
    )
  }
}

export default App;
