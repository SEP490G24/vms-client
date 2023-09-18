import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const BarsOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox="0 0 20 20"
  >
    <g data-name='그룹 31928'>
      <g
        fill='none'
        stroke='currentColor'
        strokeLinecap='round'
        strokeMiterlimit='10'
        strokeWidth='1.4'
        data-name='그룹 31796'
      >
        <path d='M2 3h16' data-name='선 1536'></path>
        <path d='M2 10h16' data-name='선 1537'></path>
        <path d='M2 17h16' data-name='선 1538'></path>
      </g>
      <g data-name='그룹 31927'>
        <g data-name='그룹 5'>
          <g data-name='그룹 23257'>
            <path
              fill='none'
              d='M0 0h20v20H0z'
              data-name='사각형 18531'
            ></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const BarsOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={BarsOutlinedSvg} {...props} />
)
export default BarsOutlined
