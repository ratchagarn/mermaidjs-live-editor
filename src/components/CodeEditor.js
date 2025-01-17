import React, { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mermaid from 'mermaid'
import 'monaco-editor/esm/vs/editor/browser/controller/coreCommands.js'
import 'monaco-editor/esm/vs/editor/contrib/find/findController.js'
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js'

import contentHeightStyle from '../variables/contentHeightStyle'

function CodeEditor({ value, onChange }) {
  const editorElement = useRef()
  const [errorMessage, setErrorMessage] = useState()

  useEffect(() => {
    if (editorElement.current.children.length > 0) {
      return
    }

    const editor = monaco.editor.create(editorElement.current, {
      value,
      theme: 'vs-dark-mermaid',
      language: 'mermaid',
      automaticLayout: true,
      minimap: {
        enabled: false,
      },
    })

    editor.getModel().updateOptions({ tabSize: 2 })

    editor.onDidChangeModelContent(() => {
      const code = editor.getValue()

      onChange(code)

      try {
        mermaid.parse(code)
        setErrorMessage()
      } catch (e) {
        console.log(e)
        setErrorMessage(e.str)
      }
    })
  }, [value, onChange])

  return (
    <EditorWrapper>
      <div
        ref={editorElement}
        style={{ height: `calc(${contentHeightStyle})` }}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </EditorWrapper>
  )
}

CodeEditor.propTypes = {
  onChange: PropTypes.func,
  editorDidMount: PropTypes.func,
}

CodeEditor.defaultProps = {
  onChange: () => {},
  editorDidMount: () => {},
}

export default CodeEditor

const EditorWrapper = styled.div`
  position: relative;
`

const ErrorMessage = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background-color: #cc3333;
  color: white;
  font-size: 12px;
`
