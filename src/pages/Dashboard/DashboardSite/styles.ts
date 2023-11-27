import styled from 'styled-components'
import { PageWrapper } from '~/themes'

export const DashboardSiteWrapper = styled(PageWrapper)`
  .refresh-dashboard-content {
    .refresh-icon {
      background-color: #e9e9e9;
      border-radius: 50%;
      cursor: pointer;
      margin-bottom: 4px;
      transform: rotate(265deg)
    }
  }
`

export const ContentStyled = styled.div`
  height: 17px;
  font-size: 14px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.35px;
  text-align: right;
  color: #666666;
`

export const TimeLastUpdateStyle = styled.div`
    height: 17px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.35px;
    text-align: right;
    color: #222222;
`
