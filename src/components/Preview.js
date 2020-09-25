import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mermaid from 'mermaid'

function Preview({ code, onError }) {
  const [hasError, setHasError] = useState(false)
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
    <PreviewWrapper id="renderedSVG">
      <PreviewContainer ref={container} hasError={hasError} />
    </PreviewWrapper>
  )
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
  height: 100%;
  background-color: white;
`

const PreviewContainer = styled.div`
  overflow-x: auto;
  opacity: ${(p) => (p.hasError ? 0.4 : 1)};
  transition: 0.2s;
`
