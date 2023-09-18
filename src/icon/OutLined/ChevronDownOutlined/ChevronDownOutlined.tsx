import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ChevronDownOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='0.5em'
    fill='currentColor'
  >
    <g fill='none' data-name='그룹 21797'>
      <path d='M20 .56v10H0v-10z' data-name='사각형 18599'></path>
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M18.499 1.061l-8.327 8.5-7.673-8.5'
        data-name='패스 4773'
      ></path>
    </g>
  </svg>
)

const ChevronDownOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ChevronDownOutlinedSvg} {...props} />
)
export default ChevronDownOutlined
