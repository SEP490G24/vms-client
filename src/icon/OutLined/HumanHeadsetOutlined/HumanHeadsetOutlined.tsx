import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const HumanHeadsetOutlinedSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 28 28">
    <g data-name="그룹 32043">
        <g data-name="그룹 31743">
            <path data-name="사각형 36454" fill='none' opacity='0.2' d="M0 0h28v28H0z"/>
        </g>
        <g data-name="그룹 31870">
            <path data-name="패스 16354" d="M354.9 549.172h-.073a12.411 12.411 0 0 0-22.919 0h-.073a2.354 2.354 0 0 0-2.351 2.352v4.849a2.351 2.351 0 1 0 4.7 0v-4.849a2.344 2.344 0 0 0-.663-1.635 10.647 10.647 0 0 1 19.693 0 2.341 2.341 0 0 0-.664 1.635v4.849a2.339 2.339 0 0 0 .664 1.634 10.689 10.689 0 0 1-7.575 6.35 2.645 2.645 0 1 0 .342 1.731 12.462 12.462 0 0 0 8.846-7.367h.073a2.354 2.354 0 0 0 2.351-2.352v-4.849a2.354 2.354 0 0 0-2.351-2.348z" transform="translate(-329.251 -541.53)" fill="currentColor"/>
            <path data-name="패스 16355" d="M353.27 565.273a1.467 1.467 0 1 0-1.467 1.468 1.467 1.467 0 0 0 1.467-1.468z" transform="translate(-340.819 -553.884)" fill="currentColor"/>
            <path data-name="패스 16356" d="M367.342 565.273a1.467 1.467 0 1 0-1.467 1.468 1.467 1.467 0 0 0 1.467-1.468z" transform="translate(-348.626 -553.884)" fill="currentColor"/>
            <path data-name="패스 16357" d="M359.718 575.483h-7.725a4.13 4.13 0 0 0 7.725 0z" transform="translate(-341.739 -560.36)" fill="currentColor"/>
        </g>
    </g>
  </svg>
)

const HumanHeadsetOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={HumanHeadsetOutlinedSvg} {...props} />
)
export default HumanHeadsetOutlined
