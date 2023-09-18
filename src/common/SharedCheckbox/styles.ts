import styled from 'styled-components'

export const CheckboxWrapper = styled.div<{ circle?: boolean }>`
  display: flex;
  align-items: center;

  .ant-checkbox-checked:after,
  .ant-checkbox-inner {
    border-radius: ${props => (props.circle ? `50%` : `4px`)};
  }


  .checkbox-title {
    margin-left: 8px;
  }
`
