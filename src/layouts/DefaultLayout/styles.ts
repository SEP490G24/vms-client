import styled from 'styled-components'

export const LayoutWrapper = styled.div`
`

export const Wrapper = styled.div`
`

export const ContentWrapper = styled.div<{collapsed: boolean}>`
  margin-top: 80px;
  margin-left: ${props => props.collapsed ? '100px' : '220px'};
`

export const Content = styled.div`
  margin-top: 24px;
`
