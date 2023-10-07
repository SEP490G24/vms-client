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
    overflow-x: hidden;
    font-size: 14px;
    font-weight: normal;
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

export const PageWrapper = styled.div`
  .page-header-text {
    margin-bottom: 24px;
  }
  .vms-form .ant-form-item-label>label {
    text-wrap: balance !important;
  }
`

export const ModalGlobalStyle = createGlobalStyle`
  .ant-modal .ant-modal-content {
    padding: unset;
  }
`
