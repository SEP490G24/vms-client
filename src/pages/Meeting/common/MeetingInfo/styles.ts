import styled from 'styled-components'
import { SharedModal } from '~/common'
import PerfectScrollbar from 'react-perfect-scrollbar'

export const MeetingInfoWrapper = styled(SharedModal)`
`

export const ContentWrapper = styled(PerfectScrollbar)`
  text-align: center;
  max-height: 500px;
  background-color: ${(props) => props.theme.gray['100']};
  border: 1px dashed ${(props) => props.theme.gray['300']};
  border-radius: 12px;
  margin-top: 16px;
  padding: 24px 32px ;
`
