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

import ViewActionMenu from './ViewActionMenu'
import ZoomControl from './ZoomControl'
import CodeEditor from './CodeEditor'
import Preview from './Preview'

const { Header, Footer, Content } = Layout
const initZoomPercentage = 100

function EditorMode({ fallbackData }) {
  const { data } = useParams()
  const history = useHistory()
  const decodeData = ensureDecodeParamData(data, fallbackData)

  const [sourceCode, setSourceCode] = useState(decodeData)
  const [activeZoomPercentage, setActiveZoomPercentage] = useState(
    initZoomPercentage
  )

  const debounced = useDebouncedCallback(
    (sourceCode) => history.replace(`/edit/${Base64.encodeURI(sourceCode)}`),
    500
  )

  return (
    <Layout>
      <Header>
        <Row type="flex">
          <Col>
            <AppName>Mermaid Live Editor</AppName>
          </Col>
        </Row>
      </Header>

      <Content style={{ minHeight: `calc(${contentHeightStyle})` }}>
        <Row type="flex">
          <Col span={10}>
            <CodeEditor value={decodeData} onChange={handleOnEditorChange} />
          </Col>
          <Col span={14}>
            <PreviewActionBar>
              <Row type="flex">
                <Col span={14}>
                  <ViewActionMenu />
                </Col>
                <Col span={10}>
                  <Row type="flex" gutter={16} justify="end">
                    <Col>
                      <ZoomControl
                        initZoomPercentage={initZoomPercentage}
                        onChange={handleOnZoomControlChange}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </PreviewActionBar>
            <Preview code={sourceCode} zoomPercentage={activeZoomPercentage} />
          </Col>
        </Row>
      </Content>

      <Footer
        style={{
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: 'ghostwhite',
          fontSize: 12,
        }}
      >
        <Row type="flex">
          <Col span={14}>Made with Love by @ratchagarn</Col>
          <Col span={10}>
            <Row type="flex" justify="end">
              <Col>v{pkg.version}</Col>
            </Row>
          </Col>
        </Row>
      </Footer>
    </Layout>
  )

  function handleOnZoomControlChange(zoomPercentage) {
    setActiveZoomPercentage(zoomPercentage)
  }

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

const PreviewActionBar = styled.div`
  height: 38px;
  padding: 8px;
  background-color: black;
  color: #999;
`
