import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const UserTwoToneSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    viewBox='0 0 28 28'
  >
    <g data-name='그룹 25509'>
      <g data-name='그룹 23849'>
        <circle
          cx='14'
          cy='14'
          r='14'
          fill='#cddafc'
          data-name='타원 126'
        ></circle>
        <g data-name='그룹 23248'>
          <path
            fill='#9fb0de'
            d='M7 20v-1.75c0-1.924 3.15-3.5 7-3.5s7 1.575 7 3.5V20zm3.5-10.5A3.5 3.5 0 1114 13a3.5 3.5 0 01-3.5-3.5z'
            data-name='합치기 1'
          ></path>
        </g>
      </g>
    </g>
  </svg>
)

const UserTwoTone = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={UserTwoToneSvg} {...props} />
)
export default UserTwoTone
