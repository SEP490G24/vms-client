import styled from 'styled-components'

export const ModuleWrapper = styled.div`

  max-height: calc(100vh - 240px);
  padding-bottom: 40px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`
