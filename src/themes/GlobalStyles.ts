import styled, { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #fff;
    color: #222;
    font-family: sans-serif, Arial, Helvetica, sans-serif;
    font-size: 14px;
    font-weight: normal;
  }

  .vms-table {
    .ant-table-body,
    .ant-table-content {
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background-color: #fbfbfb;
      }

      &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
        background-color: #fbfbfb;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #c9c9c9;
        border-radius: 4px;
        position: absolute;
      }
    }
  }

  .vms-card.filter-card {
    max-width: 400px;
  }


  .custom-scrollbar::-webkit-scrollbar {
    height: 6px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #adbcc8;
    margin: 0 10px;
    border-radius: 10px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }

  .vms-modal {
    .ant-modal-header {
      padding-bottom: 12px;
      margin-bottom: 16px;
      border-bottom: 1px solid #f0f0f0;
    }

    .ant-modal-content {
      padding: 24px 40px 40px;
    }
  }

  .vms-radio-group {
    .ant-radio-button-wrapper {
      margin-right: 8px;
      border-radius: 4px;
      border-inline-start-width: 1px;
      margin-bottom: 8px;
    }

    .ant-radio-button-wrapper:not(:first-child)::before {
      display: none;
    }

    &.no-space {

    }
  }


`

export const ResetMui = createGlobalStyle`

  .MuiDialog-root,
  .MuiDialog-container,
  .MuiBackdrop-root {
    display: none !important;
  }
  
  .MuiTabs-scrollButtons.Mui-disabled {
    opacity: unset !important;
  }


  .MuiDialog-root,
  .MuiModal-root {
    z-index: 1049 !important;
  }
`

export const PageWrapper = styled.div`
  .page-header-text {
    margin-bottom: 24px;
  }
  .vms-form .ant-form-item-label>label {
    text-wrap: balance !important;
  }
`
