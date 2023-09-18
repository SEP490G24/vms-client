import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const DesktopTwoToneSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 28 28'
  >
    <g data-name='그룹 31926' transform='translate(-178 -400)'>
      <circle
        cx='14'
        cy='14'
        r='14'
        fill='#e4ddf2'
        data-name='타원 340'
        transform='translate(178 400)'
      ></circle>
      <g data-name='그룹 25510'>
        <g
          fill='none'
          stroke='#a37ece'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth='1.4'
          data-name='그룹 25080'
          transform='translate(184.4 406.4)'
        >
          <rect
            width='15.2'
            height='10.978'
            data-name='사각형 35407'
            rx='2'
          ></rect>
          <path d='M7.6 10.978V15.2' data-name='선 1539'></path>
          <path d='M11.4 15.2H3.8' data-name='선 1540'></path>
          <path d='M0 8.444h15.2' data-name='선 1541'></path>
        </g>
      </g>
    </g>
  </svg>
)

const DesktopTwoTone = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DesktopTwoToneSvg} {...props} />
)
export default DesktopTwoTone
