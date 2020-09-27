import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styled from 'styled-components'

const zoomScaleList = [100, 75, 50]

function ZoomControl({ initZoomScale, onChange }) {
  const [zoomScale, setZoomScale] = useState(initZoomScale)

  useEffect(() => {
    onChange(zoomScale)
  }, [onChange, zoomScale])

  return (
    <Row type="flex" gutter={16}>
      <Col>Zoom</Col>
      {zoomScaleList.map((scale) => (
        <Col key={scale}>
          <ZoomScale
            active={zoomScale === scale}
            onClick={handleOnZoomScaleClick(scale)}
          >
            {scale}%
          </ZoomScale>
        </Col>
      ))}
    </Row>
  )

  function handleOnZoomScaleClick(scale) {
    return () => {
      setZoomScale(scale)
    }
  }
}

ZoomControl.propTypes = {
  initZoomScale: PropTypes.number,
  onChange: PropTypes.func,
}

ZoomControl.defaultProps = {
  initZoomScale: 100,
  onChange: () => {},
}

export default ZoomControl

const ZoomScale = styled.span`
  color: ${(p) => (p.active ? 'white' : '#666')};
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    color: ${(p) => (p.active ? 'white' : '#AAA')};
  }
`
