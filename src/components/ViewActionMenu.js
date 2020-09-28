import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Dropdown, message } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import dayjs from 'dayjs'

import exportSVGElement from '../helpers/exportSVGElement'

function ViewActionMenu() {
  const { data } = useParams()

  const linkToView = `/views/${data}`

  const menu = (
    <Menu>
      <Menu.Item>
        <Link to={`/views/${data}`} target="_blank">
          Link to views
        </Link>
      </Menu.Item>
      <Menu.Item onClick={handleCopyLinkToView(linkToView)}>
        Copy - Link to views
      </Menu.Item>
      <Menu.Item onClick={handleOnDownloadAsSVG}>Donwload as SVG</Menu.Item>
      <Menu.Item onClick={handleOnDownloadAsPNG}>Donwload as PNG</Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <TiggerButton onClick={(e) => e.preventDefault()}>
        <BarsOutlined style={{ fontWeight: 'bold' }} />
      </TiggerButton>
    </Dropdown>
  )

  function handleCopyLinkToView(data) {
    return () => {
      copy(`${window.location.origin}/#${data}`)
      message.info('Copied!')
    }
  }

  function handleOnDownloadAsSVG() {
    const svg = document.getElementById('renderedSVG').querySelector('svg')

    exportSVGElement(svg).asSVG(generateSaveFilename('svg'))
  }

  function handleOnDownloadAsPNG() {
    const svg = document.getElementById('renderedSVG').querySelector('svg')

    exportSVGElement(svg).asPNG(generateSaveFilename('png'))
  }

  function generateSaveFilename(extension) {
    return `mermaid-diagram-${dayjs().format('YYYYMMDDHHmmss')}.${extension}`
  }
}

export default ViewActionMenu

const TiggerButton = styled.button`
  display: inline;
  border: 0;
  background: none;
  color: white;
  outline: none;
  cursor: pointer;
`
