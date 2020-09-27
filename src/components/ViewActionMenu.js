import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Dropdown, message } from 'antd'
import { BarsOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { Base64 } from 'js-base64'
import dayjs from 'dayjs'

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
      <Menu.Item>
        <span onClick={handleCopyLinkToView(linkToView)}>
          Copy - Link to views
        </span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={handleOnDownloadAsSVG}>Donwload as SVG</span>
      </Menu.Item>
      <Menu.Item>
        <span onClick={handleOnDownloadAsPNG}>Donwload as PNG</span>
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

    const dataURI = `data:image/svg+xml;base64,${Base64.encode(svg.outerHTML)}`

    const downloadLink = document.createElement('a')
    downloadLink.href = dataURI
    downloadLink.download = generateSaveFilename('svg')
    downloadLink.click()
  }

  function handleOnDownloadAsPNG() {
    const svg = document.getElementById('renderedSVG').querySelector('svg')
    const svgSize = svg.getBoundingClientRect()

    const svgData = new XMLSerializer().serializeToString(svg)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = svgSize.width
    canvas.height = svgSize.height

    const img = document.createElement('img')

    img.setAttribute('src', 'data:image/svg+xml;base64,' + btoa(svgData))
    img.onload = () => {
      ctx.drawImage(img, 0, 0)
      const dataURI = canvas.toDataURL('image/png')

      const downloadLink = document.createElement('a')
      downloadLink.href = dataURI
      downloadLink.download = generateSaveFilename('png')
      downloadLink.click()
    }
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
