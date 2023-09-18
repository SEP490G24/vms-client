import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ChatbotHeadsetOutlinedSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 28 28">
    <g data-name="그룹 32042">
        <g data-name="그룹 31743">
            <path data-name="사각형 36454" fill="none" opacity={'0.2'} d="M0 0h27.993v28H0z"/>
        </g>
        <g data-name="그룹 31867">
            <path data-name="패스 16352" d="M774.024 549.233h-.074a12.516 12.516 0 0 0-23.111 0h-.074a2.373 2.373 0 0 0-2.371 2.37v4.888a2.37 2.37 0 1 0 4.741 0V551.6a2.357 2.357 0 0 0-.67-1.647 10.737 10.737 0 0 1 19.857 0 2.358 2.358 0 0 0-.67 1.647v4.888a2.363 2.363 0 0 0 .67 1.648 10.776 10.776 0 0 1-7.638 6.4 2.667 2.667 0 1 0 .345 1.745 12.567 12.567 0 0 0 8.92-7.426h.074a2.373 2.373 0 0 0 2.371-2.371V551.6a2.373 2.373 0 0 0-2.37-2.367z" transform="translate(-748.395 -541.529)" fill="currentColor"/>
            <path data-name="패스 16353" d="M773.447 569.1v-2.742h.884a3.32 3.32 0 0 0 0-6.64h-5.81a3.32 3.32 0 0 0 0 6.64h2.279z" transform="translate(-757.426 -551.387)" fill="currentColor"/>
        </g>
    </g>
  </svg>
)

const ChatbotHeadsetOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ChatbotHeadsetOutlinedSvg} {...props} />
)
export default ChatbotHeadsetOutlined
