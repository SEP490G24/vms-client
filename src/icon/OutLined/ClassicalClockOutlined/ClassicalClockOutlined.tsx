import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ClassicalClockOutlinedSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 32">
    <g data-name="그룹 31923">
        <g data-name="그룹 31916">
            <path data-name="사각형 36566" fill="none" d="M0 0h40v32H0z"/>
        </g>
        <g data-name="그룹 31915">
            <path data-name="패스 16366" d="m989.947 746.729-3.515 3.515-1.305-1.305a1.194 1.194 0 0 0-1.689 1.689l2.15 2.15a1.193 1.193 0 0 0 1.689 0l4.36-4.36a1.194 1.194 0 1 0-1.689-1.689z" transform="translate(-966.081 -736.163)" fill="currentColor"/>
            <path data-name="패스 16367" d="M984.393 741.634a11.2 11.2 0 0 0-.94-4.5 4.44 4.44 0 0 0-6.453-6.083 11.278 11.278 0 0 0-7.738 0 4.44 4.44 0 0 0-6.459 6.084 11.241 11.241 0 0 0 2.607 12.7c-1 1.46-1.409 2.851-.916 3.226s1.721-.4 2.859-1.752a11.24 11.24 0 0 0 11.553 0c1.138 1.354 2.365 2.126 2.859 1.752s.081-1.765-.916-3.226a11.234 11.234 0 0 0 3.544-8.201zm-10.432 9.078v-.956a.836.836 0 1 0-1.672 0v.956a9.132 9.132 0 0 1-8.241-8.241H965a.836.836 0 0 0 0-1.672h-.956a9.131 9.131 0 0 1 8.241-8.241v.955a.836.836 0 1 0 1.672 0v-.955a9.131 9.131 0 0 1 8.243 8.242h-.955a.836.836 0 1 0 0 1.672h.955a9.131 9.131 0 0 1-8.238 8.24z" transform="translate(-952.715 -725.787)" fill="currentColor"/>
        </g>
    </g>
  </svg>
)

const ClassicalClockOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ClassicalClockOutlinedSvg} {...props} />
)
export default ClassicalClockOutlined
