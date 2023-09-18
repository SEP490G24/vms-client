import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const MailOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
  >
    <g data-name='그룹 31741'>
      <g data-name='그룹 31739'>
        <g
          fill='none'
          stroke='#333'
          strokeLinejoin='round'
          strokeMiterlimit='10'
          strokeWidth='1.2'
          data-name='그룹 31740'
        >
          <path d='M1 3h18v13H1z' data-name='사각형 36452'></path>
          <path
            d='M1 5.516l9.055 3.336 9.055-3.336'
            data-name='패스 16319'
          ></path>
        </g>
      </g>
      <path fill='none' d='M0 0h20v20H0z' data-name='사각형 36453'></path>
    </g>
  </svg>
)

const MailOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MailOutlinedSvg} {...props} />
)
export default MailOutlined
