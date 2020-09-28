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

const { Header, Content } = Layout
const initZoomPercentage = 100

function EditorMode({ fallbackData }) {
  const { data } = useParams()
  const history = useHistory()
  const decodeData = ensureDecodeParamData(data, fallbackData)

  const [sourceCode, setSourceCode] = useState(decodeData)
  const [activeZoomPercentage, setActiveZoomPercentage] = useState(
    initZoomPercentage
  )

  const debounced = useDebouncedCallback((sourceCode) => {
    if (sourceCode.length > 0) {
      history.replace(`/edit/${Base64.encodeURI(sourceCode)}`)
    }
  }, 500)

  return (
    <Layout>
      <Header>
        <Row type="flex">
          <Col span={10}>
            <AppName>Mermaid Live Editor v{pkg.version}</AppName>
          </Col>
          <Col span={14}>
            <Row type="flex" gutter={16} justify="end">
              <Col>
                <Signature>
                  Made with Love by{' '}
                  <a
                    href="https://github.com/ratchagarn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @ratchagarn
                  </a>
                </Signature>
              </Col>
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
            <PreviewActionBar>
              <Row type="flex">
                <Col span={6}>
                  <ViewActionMenu />
                </Col>
                <Col span={18}>
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

const Signature = styled.span`
  color: white;
  font-size: 12px;
`

const PreviewActionBar = styled.div`
  height: 38px;
  padding: 8px;
  background-color: black;
  color: #999;
`
