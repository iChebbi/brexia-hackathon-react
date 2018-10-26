import React, { Component } from 'react'
import CssBaseline from '@material-ui/core/CssBaseline'

import Navbar from './Components/Navbar'
import Editor from './Pages/Editor/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <CssBaseline >
          <Navbar />
          <Editor />
        </CssBaseline>
      </div>
    )
  }
}

export default App;
