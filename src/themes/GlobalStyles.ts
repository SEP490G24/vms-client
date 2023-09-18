import { createGlobalStyle } from 'styled-components'

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
`

export const ModalGlobalStyle = createGlobalStyle`
  .ant-modal .ant-modal-content {
    padding: unset;
  }
`
