import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import styled from 'styled-components'

const zoomPercentageList = [100, 75, 50]

function ZoomControl({ initZoomPercentage, onChange }) {
  const [zoomPercentage, setZoomPercentage] = useState(initZoomPercentage)

  useEffect(() => {
    onChange(zoomPercentage)
  }, [onChange, zoomPercentage])

  return (
    <Row type="flex" gutter={16}>
      <Col>Zoom</Col>
      {zoomPercentageList.map((scale) => (
        <Col key={scale}>
          <ZoomScale
            active={zoomPercentage === scale}
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
      setZoomPercentage(scale)
    }
  }
}

ZoomControl.propTypes = {
  initZoomPercentage: PropTypes.oneOf(zoomPercentageList),
  onChange: PropTypes.func,
}

ZoomControl.defaultProps = {
  initZoomPercentage: 100,
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
