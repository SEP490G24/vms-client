import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const SendFilledSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height}>
    <g data-name="\uADF8\uB8F9 25515">
      <g data-name="\uADF8\uB8F9 25451">
        <path
          d="m926.086 1217.233-15-.014h-.027c-.94.026-1.113.542-.381 1.154l4.55 4.471c.872.678 1.051.617 1.828.152l1.97-1.183a.584.584 0 1 1 .6 1l-1.97 1.184c-.775.469-.914.6-.724 1.686l1.812 6.116c.2.934.734 1.023 1.2.206l.013-.024 7.028-13.247a.925.925 0 0 0-.9-1.5z"
          data-name="\uD328\uC2A4 15960"
          fill="currentColor"
          transform="translate(-908.701 -1213.756)"
        />
        <path
          d="M0 0h20v20H0z"
          data-name="\uC0AC\uAC01\uD615 35797"
          fill="none"
        />
      </g>
    </g>
  </svg>
)

const SendFilled = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={SendFilledSvg} {...props} >{props.width}</Icon>
)
export default SendFilled