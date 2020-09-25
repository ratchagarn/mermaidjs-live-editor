import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Row, Col } from 'antd'
import mermaid from 'mermaid'

import contentHeightStyle from '../variables/contentHeightStyle'

const zoomScaleList = [100, 75, 50]

function Preview({ code, onError }) {
  const [hasError, setHasError] = useState(false)
  const [activeZoomScale, setActiveZoomScale] = useState(zoomScaleList[0])
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
      <ZoomControl>
        <Row type="flex" gutter={16} justify="end">
          <Col>Zoom</Col>
          {zoomScaleList.map((scale) => (
            <Col key={scale}>
              <ZoomScale
                active={activeZoomScale === scale}
                onClick={handleOnZoomScaleClick(scale)}
              >
                {scale}%
              </ZoomScale>
            </Col>
          ))}
        </Row>
      </ZoomControl>
      <PreviewContainer
        id="renderedSVG"
        ref={container}
        hasError={hasError}
        scale={activeZoomScale}
      />
    </PreviewWrapper>
  )

  function handleOnZoomScaleClick(scale) {
    return () => {
      setActiveZoomScale(scale)
    }
  }
}

Preview.propTypes = {
  code: PropTypes.string,
  onError: PropTypes.func,
}

Preview.defaultProps = {
  onError: () => {},
}

export default Preview

const PreviewWrapper = styled.div`
  position: relative;
`

const PreviewContainer = styled.div`
  height: calc(${contentHeightStyle} - 38px);
  background-color: white;
  opacity: ${(p) => (p.hasError ? 0.4 : 1)};
  overflow: auto;
  transition: 0.2s;

  svg {
    height: auto;
    transform: scale(${(p) => p.scale / 100});
    transition: transform 0.2s;
  }
`

const ZoomControl = styled.div`
  padding: 8px;
  background-color: black;
  color: #999;
`

const ZoomScale = styled.span`
  color: ${(p) => (p.active ? 'white' : '#666')};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${(p) => (p.active ? 'white' : '#AAA')};
  }
`
