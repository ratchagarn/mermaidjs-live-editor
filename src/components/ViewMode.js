import React, { Fragment, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'

import { ensureDecodeParamData } from '../helpers/utils'

import Preview from './Preview'

function ViewMode() {
  const [error, setError] = useState()
  const { data } = useParams()
  const decodeData = ensureDecodeParamData(data)

  return (
    <Fragment>
      <Preview code={decodeData} onError={handleOnError} />
      {error && (
        <ErrorMessage>
          Can not render diagram, please check data source
        </ErrorMessage>
      )}
    </Fragment>
  )

  function handleOnError() {
    setError(true)
  }
}

export default ViewMode

const ErrorMessage = styled.p`
  padding: 16px;
  font-size: 16px;
  color: red;
`
