import styled from 'styled-components'
import { Layout } from 'antd'

export const SideBarWrapper = styled(Layout)`
  background-color: ${(props) => props.theme.black};
  color: ${(props) => props.theme.white};
`

export const SideHeader = styled.div`
`

export const SideContent = styled.div`
  .ant-menu-item-selected {
    //border-right: 3px solid;
  }
`
