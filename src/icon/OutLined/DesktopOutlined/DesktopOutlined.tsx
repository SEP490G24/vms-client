import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const DesktopOutlinedSvg = (props: any) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={props.width} height={props.height} viewBox='0 0 28 28'>
    <g data-name='그룹 32007'>
      <g data-name='그룹 24927'>
        <g data-name='그룹 24791'>
          <g data-name='그룹 5'>
            <g data-name='그룹 23257'>
              <path
                fill='none'
                d='M0-.001h28v28H0z'
                data-name='사각형 18531'
              ></path>
            </g>
          </g>
        </g>
      </g>
      <g data-name='그룹 32005'>
        <g stroke='#4c5053' strokeWidth='1.3' data-name='그룹 32006'>
          <g fill='#fff' data-name='사각형 36595' transform='translate(3 4)'>
            <rect width='22' height='16' stroke='none' rx='3'></rect>
            <rect
              width='20.7'
              height='14.7'
              x='0.65'
              y='0.65'
              fill='none'
              rx='2.35'
            ></rect>
          </g>
          <g fill='none' strokeLinecap='round' data-name='그룹 32004'>
            <path d='M13.674 19.849v3.484' data-name='선 1732'></path>
            <path d='M18.344 24h-9.34' data-name='선 1733'></path>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const DesktopOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={DesktopOutlinedSvg} {...props} />
)
export default DesktopOutlined
