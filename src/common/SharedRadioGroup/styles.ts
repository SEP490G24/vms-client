import styled from 'styled-components'

export const RadioGroupWrapper = styled.div`
  .ant-radio-button-wrapper {
    border-radius: 0.25rem;
    border-inline-start-width: 1px;
  }

  .ant-radio-button-wrapper:before {
    content: none;
  }

  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled),
  .ant-radio-button-wrapper-checked:not(.ant-radio-button-wrapper-disabled):hover {
    color: ${(props) => props.theme.primary.normal};
    background: ${(props) => props.theme.primary.light};
    border-color: ${(props) => props.theme.primary.normal};
  }
`
