import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useParams, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { Layout, Row, Col } from 'antd'
import { Base64 } from 'js-base64'
import { useDebouncedCallback } from 'use-debounce'

import pkg from '../../package.json'

import { ensureDecodeParamData } from '../helpers/utils'

import contentHeightStyle from '../variables/contentHeightStyle'

import ActionsMenu from './ActionsMenu'
import CodeEditor from './CodeEditor'
import Preview from './Preview'

const { Header, Footer, Content } = Layout

function EditorMode({ fallbackData }) {
  const { data } = useParams()
  const history = useHistory()
  const decodeData = ensureDecodeParamData(data, fallbackData)
  const [sourceCode, setSourceCode] = useState(decodeData)

  const debounced = useDebouncedCallback(
    (sourceCode) => history.replace(`/edit/${Base64.encodeURI(sourceCode)}`),
    500
  )

  return (
    <Layout>
      <Header>
        <Row type="flex">
          <Col span={14}>
            <AppName>Mermaid Live Editor</AppName>
          </Col>
          <Col span={10}>
            <Row type="flex" justify="end">
              <ActionsMenu />
            </Row>
          </Col>
        </Row>
      </Header>
      <Content style={{ minHeight: `calc(${contentHeightStyle})` }}>
        <Row type="flex">
          <Col span={10}>
            <CodeEditor value={decodeData} onChange={handleOnEditorChange} />
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
    debounced.callback(value)
  }
}

EditorMode.propTypes = {
  fallbackData: PropTypes.string,
}

export default EditorMode

const AppName = styled.h3`
  color: white;
`
