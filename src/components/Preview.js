import React, { useEffect, useState, useRef } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import mermaid from 'mermaid'
import { useDebouncedCallback } from 'use-debounce'

import contentHeightStyle from '../variables/contentHeightStyle'

function Preview({ code, onError, zoomPercentage }) {
  const [hasError, setHasError] = useState(false)
  const container = useRef()

  useEffect(() => {
    hasError && onError()
  }, [hasError, onError])

  useDebouncedCallback((sourceCode) => {
    if (!sourceCode) {
      return
    }

    try {
      setHasError(false)

      mermaid.parse(sourceCode)
      container.current.removeAttribute('data-processed')
      container.current.innerHTML = sourceCode
      mermaid.init(undefined, container.current)
    } catch (e) {
      setHasError(true)
    }
  }, 500).callback(code)

  return (
    <PreviewContainer
      id="renderedSVG"
      ref={container}
      hasError={hasError}
      zoomPercentage={zoomPercentage}
    />
  )
}

Preview.propTypes = {
  code: PropTypes.string,
  onError: PropTypes.func,
  zoomPercentage: PropTypes.number,
}

Preview.defaultProps = {
  onError: () => {},
}

export default Preview

const PreviewContainer = styled.div`
  height: calc(${contentHeightStyle} - 38px);
  background-color: white;
  opacity: ${(p) => (p.hasError ? 0.4 : 1)};
  overflow: auto;
  transition: 0.2s;

  svg {
    height: auto;
    max-height: 100vh;
    transform: ${(p) => p.zoomPercentage && `scale(${p.zoomPercentage / 100})`};
    transition: transform 0.2s;
  }
`
