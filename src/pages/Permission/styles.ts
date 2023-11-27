import styled from 'styled-components'

export const PermissionWrapper = styled.div`
  padding: 0 8px;

  .page-title {
    margin-bottom: 20px;
  }

  .module-tabs {
    .ant-tabs-nav {
      margin-bottom: 0;

      .ant-tabs-tab {
        border: none;
        color: ${(props) => props.theme.gray['400']};
        font-weight: 500;
        display: flex;
        justify-content: center;
        padding-bottom: 18px;
        padding-top: 18px;
        margin-right: 4px;
        width: 220px;
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
    }
  }
`
