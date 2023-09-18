import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const MessageOutlinedSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 32">
    <g data-name="그룹 31924">
        <g data-name="그룹 31920">
            <g data-name="그룹 31918">
                <path data-name="사각형 36566" fill="none" d="M0 0h40v32H0z"/>
            </g>
        </g>
        <g data-name="패스 16375" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M925.243 771.4H918.1a8.829 8.829 0 0 0-8.829 8.829 8.83 8.83 0 0 0 8.829 8.83h.42v4.2l4.2-4.2h2.523a8.829 8.829 0 0 0 8.829-8.83 8.829 8.829 0 0 0-8.829-8.829zm.543 11.919h-8.233a.988.988 0 1 1 0-1.976h8.233a.988.988 0 0 1 0 1.976zm0-4.667h-8.233a.988.988 0 1 1 0-1.976h8.233a.988.988 0 0 1 0 1.976z" stroke="none" transform="translate(-901.266 -766.397)"/>
            <path d="M918.095 771.397a8.83 8.83 0 0 0 0 17.659h.42v4.204l4.205-4.204h2.523a8.83 8.83 0 0 0 0-17.659h-7.148m7.69 7.252h-8.233a.988.988 0 1 1 0-1.976h8.234a.988.988 0 0 1 0 1.976m0 4.667h-8.234a.988.988 0 1 1 0-1.975h8.234a.988.988 0 0 1 0 1.975m-7.69-13.919h7.147c2.892 0 5.612 1.126 7.657 3.172a10.758 10.758 0 0 1 3.172 7.657c0 2.893-1.126 5.612-3.172 7.658a10.758 10.758 0 0 1-7.657 3.172h-1.694l-3.62 3.618a2 2 0 0 1-3.413-1.414v-2.318a10.749 10.749 0 0 1-6.078-3.058 10.759 10.759 0 0 1-3.172-7.658c0-2.892 1.126-5.612 3.172-7.657a10.758 10.758 0 0 1 7.657-3.172z" fill="currentColor" stroke="none" transform="translate(-901.266 -766.397)"/>
        </g>
    </g>
  </svg>
)

const MessageOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={MessageOutlinedSvg} {...props} />
)
export default MessageOutlined
