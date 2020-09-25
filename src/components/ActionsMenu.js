import React from 'react'
import { Link, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { Menu, Dropdown, message } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import copy from 'copy-to-clipboard'
import { Base64 } from 'js-base64'
import dayjs from 'dayjs'

function ActionsMenu() {
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
        <a href="#download-as-svg" onClick={handleOnDownloadSVG}>
          Donwload as SVG
        </a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <TiggerButton onClick={(e) => e.preventDefault()}>
        Actions <DownOutlined />
      </TiggerButton>
    </Dropdown>
  )

  function handleCopyLinkToView(data) {
    return () => {
      copy(`${window.location.origin}/#${data}`)
      message.info('Copied!')
    }
  }

  function handleOnDownloadSVG(event) {
    const renderedSVG = document.getElementById('renderedSVG')
    const svg = renderedSVG.querySelector('svg')

    const url = `data:image/svg+xml;base64,${Base64.encode(svg.outerHTML)}`
    event.target.href = url
    event.target.download = `mermaid-diagram-${dayjs().format(
      'YYYYMMDDHHmmss'
    )}.svg`
  }
}

export default ActionsMenu

const TiggerButton = styled.button`
  display: inline;
  border: 0;
  background: none;
  color: white;
  outline: none;
  cursor: pointer;
`
