import React from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

function NoMatch() {
  const location = useLocation()

  return (
    <NoMatchLayout>
      No match for <code>{location.pathname}</code>
    </NoMatchLayout>
  )
}

export default NoMatch

const NoMatchLayout = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  transform: translateY(-50%);

  code {
    padding: 4px;
    background-color: #efefef;
    border-radius: 2px;
  }
`
