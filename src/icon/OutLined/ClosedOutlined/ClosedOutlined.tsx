import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ClosedOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
  >
    <g data-name='그룹 31885'>
      <g data-name='그룹 31748'>
        <g data-name='그룹 31747'>
          <circle
            cx='8'
            cy='8'
            r='8'
            fill='none'
            stroke='#20232d'
            strokeMiterlimit='10'
            strokeWidth='1.2'
            data-name='타원 380'
            transform='translate(2695.305 784.577) translate(-2693.305 -782.578)'
          ></circle>
        </g>
        <path
          fill='none'
          d='M0 0h20v20H0z'
          data-name='사각형 36456'
          opacity='0.2'
        ></path>
      </g>
      <g
        fill='none'
        stroke='#20232d'
        strokeLinecap='round'
        data-name='그룹 31749'
      >
        <path d='M12.828 7.17L7.17 12.829' data-name='선 1712'></path>
        <path d='M12.827 12.827L7.17 7.17' data-name='선 1713'></path>
      </g>
    </g>
  </svg>
)

const ClosedOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ClosedOutlinedSvg} {...props} />
)
export default ClosedOutlined
