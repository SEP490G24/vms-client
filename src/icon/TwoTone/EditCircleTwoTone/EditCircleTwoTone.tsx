import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const IconSvg = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' fill='currentColor' viewBox='0 0 56 56'>
    <defs>
      <filter
        id='hksw6bdqsa'
        width='1em'
        height='1em'
        x='0'
        y='0'
        filterUnits='userSpaceOnUse'
      >
        <feOffset dy='4'></feOffset>
        <feGaussianBlur result='blur' stdDeviation='4'></feGaussianBlur>
        <feFlood floodOpacity='0.102'></feFlood>
        <feComposite in2='blur' operator='in'></feComposite>
        <feComposite in='SourceGraphic'></feComposite>
      </filter>
    </defs>
    <g data-name='그룹 182413' transform='translate(12 8)'>
      <g filter='url(#hksw6bdqsa)'>
        <circle
          cx='16'
          cy='16'
          r='16'
          fill='#fff'
          data-name='타원 18'
        ></circle>
      </g>
      <circle
        cx='14'
        cy='14'
        r='14'
        fill='#21c7a1'
        data-name='타원 19'
        transform='translate(2 2)'
      ></circle>
      <g fill='#fff' data-name='그룹 182348'>
        <path
          d='M8.894 20.384V23h2.616l9.152-9.153-2.616-2.616z'
          data-name='패스 23799'
        ></path>
        <path
          d='M21.316 13.193l-2.615-2.615 1.307-1.308a.925.925 0 011.307 0l1.307 1.308a.924.924 0 010 1.307z'
          data-name='패스 23800'
        ></path>
      </g>
    </g>
  </svg>
)

const EditCircleTwoTone = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={IconSvg} {...props} />
)
export default EditCircleTwoTone
