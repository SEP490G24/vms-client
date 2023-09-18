import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const IntegrationOutlinedSvg = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='1em'
    height='1em'
    fill='currentColor'
    viewBox='0 0 20 20'
  >
    <g data-name='그룹 24927'>
      <g data-name='그룹 24791'>
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
      <g data-name='그룹 24794'>
        <g data-name='그룹 24792' transform='translate(-44 -313.5)'>
          <g fill='none' stroke='#4c5053' data-name='그룹 24793'>
            <g data-name='사각형 35130' transform='translate(45 327)'>
              <rect width='18' height='5' stroke='none' rx='2.5'></rect>
              <rect width='17' height='4' x='0.5' y='0.5' rx='2'></rect>
            </g>
            <g data-name='사각형 35131' transform='translate(45 321)'>
              <rect width='18' height='5' stroke='none' rx='2.5'></rect>
              <rect width='17' height='4' x='0.5' y='0.5' rx='2'></rect>
            </g>
            <g data-name='사각형 35132' transform='translate(45 315)'>
              <rect width='18' height='5' stroke='none' rx='2.5'></rect>
              <rect width='17' height='4' x='0.5' y='0.5' rx='2'></rect>
            </g>
          </g>
          <circle
            cx='0.5'
            cy='0.5'
            r='0.5'
            fill='#4c5053'
            data-name='타원 246'
            transform='translate(59 317)'
          ></circle>
          <circle
            cx='0.5'
            cy='0.5'
            r='0.5'
            fill='#4c5053'
            data-name='타원 249'
            transform='translate(59 323)'
          ></circle>
          <circle
            cx='0.5'
            cy='0.5'
            r='0.5'
            fill='#4c5053'
            data-name='타원 251'
            transform='translate(59 329)'
          ></circle>
          <circle
            cx='0.5'
            cy='0.5'
            r='0.5'
            fill='#4c5053'
            data-name='타원 247'
            transform='translate(48 317)'
          ></circle>
          <circle
            cx='0.5'
            cy='0.5'
            r='0.5'
            fill='#4c5053'
            data-name='타원 248'
            transform='translate(48 323)'
          ></circle>
          <circle
            cx='0.5'
            cy='0.5'
            r='0.5'
            fill='#4c5053'
            data-name='타원 250'
            transform='translate(48 329)'
          ></circle>
        </g>
      </g>
    </g>
  </svg>
)

const IntegrationOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={IntegrationOutlinedSvg} {...props} />
)
export default IntegrationOutlined
