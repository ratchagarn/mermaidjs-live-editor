import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import ViewMode from './components/ViewMode'
import EditorMode from './components/EditorMode'

function App() {
  return (
    <Switch>
      <Route path="/views">
        <ViewMode />
      </Route>
      <Route path="/edit">
        <EditorMode />
      </Route>
      <Route path="/">
        <Redirect to={{ pathname: '/edit' }} />
      </Route>
    </Switch>
  )
}

export default App
