import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Dropdown, Tag, message } from 'antd'
import {
  BarsOutlined,
  CopyOutlined,
  DownloadOutlined,
  LinkOutlined,
} from '@ant-design/icons'
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
          <LinkOutlined /> Link to views
        </Link>
      </Menu.Item>
      <Menu.Item onClick={handleCopyLinkToView(linkToView)}>
        <CopyOutlined /> Copy - Link to views
      </Menu.Item>
      <Menu.Item onClick={handleOnDownloadAsSVG}>
        <DownloadOutlined /> Donwload as <Tag color="orange">SVG</Tag>
      </Menu.Item>
      <Menu.Item onClick={handleOnDownloadAsPNG}>
        <DownloadOutlined /> Donwload as <Tag color="red">PNG</Tag>
      </Menu.Item>
      <Menu.Item onClick={handleOnDownloadAsPDF}>
        <DownloadOutlined /> Donwload as <Tag color="darkred">PDF</Tag>
      </Menu.Item>
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

  function handleOnDownloadAsPDF() {
    const svg = document.getElementById('renderedSVG').querySelector('svg')

    exportSVGElement(svg).asPDF(generateSaveFilename('pdf'))
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
