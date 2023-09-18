import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const TicketOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
  >
    <g fill='none' data-name='그룹 31743'>
      <g
        stroke='#333'
        strokeLinejoin='round'
        strokeMiterlimit='10'
        strokeWidth='1.2'
        data-name='그룹 31742'
      >
        <path
          d='M17.719 9.609V2.08h-7.613l-8.387 8.336 7.68 7.664z'
          data-name='패스 16320'
        ></path>
        <path
          d='M10.608 7.428a1.662 1.662 0 001.663 1.661 1.663 1.663 0 001.665-1.661 1.663 1.663 0 00-1.665-1.661 1.663 1.663 0 00-1.663 1.661z'
          data-name='패스 16321'
        ></path>
      </g>
      <path d='M0 0h20v20H0z' data-name='사각형 36454' opacity='0.2'></path>
    </g>
  </svg>
)

const TicketOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={TicketOutlinedSvg} {...props} />
)
export default TicketOutlined
