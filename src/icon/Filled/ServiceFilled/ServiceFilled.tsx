import Icon from '@ant-design/icons'
import type { CustomIconComponentProps } from '@ant-design/icons/lib/components/Icon'

const ServiceFilledSvg = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 40 32">
    <g data-name="그룹 31922">
        <g data-name="그룹 31921">
            <g data-name="그룹 31918">
                <path data-name="사각형 36566" fill="none" d="M0 0h40v32H0z"/>
            </g>
        </g>
        <path data-name="패스 16374" d="m514.114 599.5.038-8.3a3.205 3.205 0 1 0-1.7.026l-.037 8.269a3.2 3.2 0 0 0-.736.3l-10.2-10.068a3.107 3.107 0 0 0 .415-1.552 3.2 3.2 0 1 0-4.052 3.042v8.283a3.2 3.2 0 1 0 1.7 0v-8.285a3.21 3.21 0 0 0 .722-.293l10.2 10.068a3.108 3.108 0 0 0-.415 1.552 3.2 3.2 0 1 0 4.066-3.038z" transform="translate(-485.484 -579.015)" fill={props.fill}/>
    </g>
</svg>
)

const ServiceFilled = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={ServiceFilledSvg} {...props} />
)
export default ServiceFilled
