import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Base64 } from 'js-base64'

import NoMatch from './components/NoMatch'
import ViewMode from './components/ViewMode'
import EditorMode from './components/EditorMode'

import defaultSourceCode from './variables/defaultSourceCode'

const dataFromDefaultSourceCode = Base64.encodeURI(defaultSourceCode)

function App() {
  return (
    <Switch>
      <Route exact path="/views/:data">
        <ViewMode />
      </Route>
      <Route exact path="/edit/:data">
        <EditorMode fallbackData={dataFromDefaultSourceCode} />
      </Route>
      <Route exact path="/">
        <Redirect to={{ pathname: `/edit/${dataFromDefaultSourceCode}` }} />
      </Route>
      <Route path="*">
        <NoMatch />
      </Route>
    </Switch>
  )
}

export default App
