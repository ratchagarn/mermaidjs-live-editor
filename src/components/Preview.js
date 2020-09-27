import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import mermaid from 'mermaid'

import contentHeightStyle from '../variables/contentHeightStyle'

import ViewActionMenu from './ViewActionMenu'
import ZoomControl from './ZoomControl'

const initZoomScale = 100

function Preview({ code, onError, viewOnlyMode }) {
  const [hasError, setHasError] = useState(false)
  const [activeZoomScale, setActiveZoomScale] = useState(initZoomScale)
  const container = useRef()

  useEffect(() => {
    hasError && onError()
  }, [hasError, onError])

  useEffect(() => {
    if (!code) {
      return
    }

    try {
      setHasError(false)

      mermaid.parse(code)
      container.current.removeAttribute('data-processed')
      container.current.innerHTML = code
      mermaid.init(undefined, container.current)
    } catch (e) {
      setHasError(true)
    }
  }, [code])

  return (
    <PreviewWrapper>
      {!viewOnlyMode && (
        <PreviewActionBar>
          <Row type="flex">
            <Col span={14}>
              <ViewActionMenu />
            </Col>
            <Col span={10}>
              <Row type="flex" gutter={16} justify="end">
                <Col>
                  <ZoomControl
                    initZoomScale={initZoomScale}
                    onChange={handleOnZoomControlChange}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </PreviewActionBar>
      )}
      <PreviewContainer
        id="renderedSVG"
        ref={container}
        viewOnlyMode={viewOnlyMode}
        hasError={hasError}
        scale={activeZoomScale}
      />
    </PreviewWrapper>
  )

  function handleOnZoomControlChange(zoomScale) {
    setActiveZoomScale(zoomScale)
  }
}

Preview.propTypes = {
  code: PropTypes.string,
  onError: PropTypes.func,
  viewOnlyMode: PropTypes.bool,
}

Preview.defaultProps = {
  onError: () => {},
  viewOnlyMode: false,
}

export default Preview

const PreviewWrapper = styled.div`
  position: relative;
`

const PreviewContainer = styled.div`
  height: ${(p) =>
    p.viewOnlyMode ? '100%' : `calc(${contentHeightStyle} - 38px)`};
  background-color: white;
  opacity: ${(p) => (p.hasError ? 0.4 : 1)};
  overflow: auto;
  transition: 0.2s;

  svg {
    height: ${(p) => (p.viewOnlyMode ? '100%' : 'auto')};
    max-height: ${(p) => p.viewOnlyMode && '100vh'};
    transform: ${(p) => (p.viewOnlyMode ? 'auto' : `scale(${p.scale / 100})`)};
    transition: transform 0.2s;
  }
`

const PreviewActionBar = styled.div`
  padding: 8px;
  background-color: black;
  color: #999;
`
