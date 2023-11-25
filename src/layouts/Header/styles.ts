import styled from 'styled-components'

export const HeaderWrapper = styled.div<{ collapsed: boolean }>`
  width: 100%;
  position: fixed;
  background-color: ${(props) => props.theme.body};
  border-bottom: 1px solid #eeeeee;
  margin-left: ${props => props.collapsed ? '100px' : '220px'};
  padding-right: ${(props) => props.collapsed ? '170px' : '290px'};
  z-index: 999;
  transition: all 300ms ease;
`
