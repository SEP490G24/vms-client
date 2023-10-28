import styled from 'styled-components'
import { SharedModal } from '~/common'

export const MeetingInfoWrapper = styled(SharedModal)`
`

export const ContentWrapper = styled.div`
  text-align: center;
  background-color: ${(props) => props.theme.gray['100']};
  border: 1px dashed ${(props) => props.theme.gray['300']};
  border-radius: 12px;
  margin-top: 16px;
  padding: 32px;
`
