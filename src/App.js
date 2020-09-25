import React, { useState } from 'react'
import styled from 'styled-components'
import { Layout, Row, Col } from 'antd'

import pkg from '../package.json'

import CodeEditor from './components/CodeEditor'
import Preview from './components/Preview'

const { Header, Footer, Content } = Layout

console.log(pkg)

const defaultCode = `
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
`.trim()

function App() {
  const [sourceCode, setSourceCode] = useState(defaultCode)

  return (
    <Layout>
      <Header>
        <Row type="flex">
          <Col>
            <AppName>Mermaid Live Editor</AppName>
          </Col>
        </Row>
      </Header>
      <Content style={{ minHeight: 'calc(100vh - 64px - 70px)' }}>
        <Row type="flex">
          <Col span={10}>
            <CodeEditor value={defaultCode} onChange={handleOnEditorChange} />
          </Col>
          <Col span={14}>
            <Preview code={sourceCode} />
          </Col>
        </Row>
      </Content>
      <Footer>
        <Row type="flex">
          <Col span={14}>Make with Love by @ratchagarn</Col>
          <Col span={10}>
            <Row type="flex" justify="end">
              <Col>v{pkg.version}</Col>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )

  function handleOnEditorChange(value) {
    setSourceCode(value)
  }
}

export default App

const AppName = styled.h3`
  color: white;
`
