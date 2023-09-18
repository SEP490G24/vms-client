import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const GeologicalClockFilledSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 32">
    <g data-name="그룹 31919">
        <g data-name="그룹 31917" transform="translate(-902.266 -219.857)">
            <path data-name="패스 16368" d="M934.235 249.213a.6.6 0 1 0-.6.6.6.6 0 0 0 .6-.6z" transform="translate(-16.634 -18.022)" fill="currentColor"/>
            <path data-name="패스 16369" d="M967.148 249.811a.6.6 0 1 0-.6-.6.6.6 0 0 0 .6.6z" transform="translate(-40.081 -18.022)" fill="currentColor"/>
            <path data-name="패스 16370" d="M928.555 276.516H927.3l-3.86 7.065v-4.588a1.41 1.41 0 0 0-2.819 0v4.588l-3.86-7.065h-1.25a6.25 6.25 0 0 0-6.25 6.25v2.871H934.8v-2.871a6.25 6.25 0 0 0-6.245-6.25z" transform="translate(0 -37.544)" fill="currentColor"/>
            <path data-name="패스 16371" d="M932.37 239.524a8.333 8.333 0 1 0-8.333-8.333 8.334 8.334 0 0 0 8.333 8.333zm0-15.014a6.681 6.681 0 1 1-6.681 6.681 6.681 6.681 0 0 1 6.681-6.682z" transform="translate(-10.335)" fill="currentColor"/>
            <circle data-name="타원 411" cx=".598" cy=".598" r=".598" transform="translate(921.437 225.56)" fill="currentColor"/>
            <circle data-name="타원 412" cx=".598" cy=".598" r=".598" transform="translate(921.437 235.625)" fill="currentColor"/>
            <path data-name="패스 16372" d="M943.866 242.869a.75.75 0 0 0 1.062 0l3.438-3.437a.751.751 0 1 0-1.062-1.062l-2.907 2.907-1.562-1.562a.751.751 0 0 0-1.062 1.062z" transform="translate(-22.591 -10.7)" fill="currentColor"/>
        </g>
        <g data-name="그룹 31918">
            <path data-name="사각형 36566" fill="none" d="M0 0h40v32H0z"/>
        </g>
    </g>
  </svg>
)

const GeologicalClockFilled = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={GeologicalClockFilledSvg} {...props} />
)
export default GeologicalClockFilled