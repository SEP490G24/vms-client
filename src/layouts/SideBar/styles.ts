import styled from 'styled-components'
import { Layout, Menu } from 'antd'

export const SideBarWrapper = styled(Layout)`
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
  position: fixed;
  height: 100%;
  z-index: 998;
`

export const SideHeader = styled.div`
`

export const SideContent = styled(Menu)`
  &.ant-menu-inline {
    width: 220px;
  }
  &.ant-menu-inline-collapsed {
    width: 100px;
  }
  
  .ant-menu-submenu-title:hover {
    color: ${(props) => props.theme.white};;
  }
  

  .ant-menu-item-selected {
    //border-right: 3px solid;
  }
`
