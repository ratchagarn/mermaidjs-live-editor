import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { Row, Col, InputNumber } from 'antd'
import styled from 'styled-components'

import { numberRange } from '../helpers/utils'

const zoomPercentageList = [100, 90, 80, 70, 60, 50]

function ZoomControl({ initZoomPercentage, onChange }) {
  const [zoomPercentage, setZoomPercentage] = useState(initZoomPercentage)

  useEffect(() => {
    onChange(zoomPercentage)
  }, [onChange, zoomPercentage])

  return (
    <Row type="flex" gutter={16}>
      {zoomPercentageList.map((scale) => (
        <Col key={scale}>
          <ZoomScale
            active={zoomPercentage === scale}
            onClick={handleOnZoomListItemClick(scale)}
          >
            {scale}%
          </ZoomScale>
        </Col>
      ))}
      <Col>
        <InputNumber
          style={{ width: 66 }}
          size="small"
          min={1}
          max={100}
          maxLength="3"
          value={zoomPercentage}
          onChange={handleOnZoomValueChange}
        />
      </Col>
    </Row>
  )

  function handleOnZoomListItemClick(percentage) {
    return () => {
      setZoomPercentage(percentage)
    }
  }

  function handleOnZoomValueChange(percentage) {
    if (typeof percentage !== 'number') {
      return
    }

    setZoomPercentage(numberRange(percentage, 1, 100))
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
