import React from 'react'
import styled from 'styled-components'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const menu = (
  <Menu>
    <Menu.Item>Link to views</Menu.Item>
    <Menu.Item>Donwload SVG</Menu.Item>
  </Menu>
)

function ActionsMenu() {
  return (
    <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
      <TiggerButton onClick={(e) => e.preventDefault()}>
        Actions <DownOutlined />
      </TiggerButton>
    </Dropdown>
  )
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
