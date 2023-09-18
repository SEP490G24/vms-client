import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ClockOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox="0 0 20 20"
  >
    <g fill='none' data-name='그룹 31746'>
      <g
        stroke='#20232d'
        strokeWidth='1.2'
        data-name='그룹 31747'
        transform='translate(2695.305 784.577)'
      >
        <circle
          cx='8'
          cy='8'
          r='8'
          strokeMiterlimit='10'
          data-name='타원 380'
          transform='translate(-2693.305 -782.578)'
        ></circle>
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M-2685.305-779.813v4.9l2.477 2.53'
          data-name='패스 16323'
        ></path>
      </g>
      <path d='M0 0h20v20H0z' data-name='사각형 36456' opacity='0.2'></path>
    </g>
  </svg>
)

const ClockOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ClockOutlinedSvg} {...props} />
)
export default ClockOutlined
