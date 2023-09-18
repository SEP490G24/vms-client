import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const AccountOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox="0 0 20 20"
  >
    <g fill='none' data-name='그룹 31745'>
      <g
        stroke='#15151c'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.2'
        data-name='그룹 31744'
        transform='translate(2.793 1.929)'
      >
        <circle
          cx='3.514'
          cy='3.514'
          r='3.514'
          data-name='타원 379'
          transform='translate(4.016)'
        ></circle>
        <path
          d='M15.06 16.064V13.47a3.974 3.974 0 00-4.016-3.932H4.016A3.974 3.974 0 000 13.47v2.594z'
          data-name='패스 16322'
        ></path>
      </g>
      <path d='M0 0h20v20H0z' data-name='사각형 36455' opacity='0.2'></path>
    </g>
  </svg>
)

const AccountOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={AccountOutlinedSvg} {...props} />
)
export default AccountOutlined
