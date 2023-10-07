import styled, { css } from 'styled-components'

export const InputWrapper = styled.div<{ hasActionBtn?: boolean }>`
  width: 100%;

  .input-label {
    font-size: 12px;
    font-weight: normal;
    margin-bottom: 4px;
    color: #888888;
  }

  ${(props) =>
    props.hasActionBtn &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 5px;
      border: 1px solid #ccc;
      border-radius: 8px;
      padding: 11px 16px 11px 12px;

      .btn-label-inner {
        min-width: fit-content;
        color: #3181ef;
        font-size: 14px;
        font-weight: normal;
      }
    `}
`
