import styled from 'styled-components'

export const TabWrapper = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0;
    .ant-tabs-tab {
      padding: 16px 30px;
      border: none;
      font-weight: 500;
      color: ${(props) => props.theme.gray['400']};
    }
    .ant-tabs-tab:not(.ant-tabs-tab-active) {
      background: #e6edff;
    }
    .ant-tabs-tab:not(.ant-tabs-tab-active):hover {
      background: #bed0ff;
      color: ${(props) => props.theme.gray['700']};
    }
    .ant-tabs-tab:not(.ant-tabs-tab-active):active {
      background: #2f82fd;
      color: ${(props) => props.theme.white};
    }
    .ant-tabs-tab+.ant-tabs-tab {
      margin-left: 8px !important;
    }
  }
`
