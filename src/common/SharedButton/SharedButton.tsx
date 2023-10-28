import { Button, Popover } from 'antd'
import React, { CSSProperties } from 'react'
import { ButtonType } from 'antd/es/button'
import { RenderFunction } from 'antd/es/_util/getRenderPropValue'
import authService from '~/service/authService.ts'

interface SharedButtonProps {
  block?: boolean
  children?: React.ReactNode | string
  className?: string
  disabled?: boolean
  htmlType?: 'button' | 'reset' | 'submit' | undefined
  icon?: React.ReactNode
  shape?: 'default' | 'circle' | 'round'
  size?: 'large' | 'middle' | 'small'
  tooltipArrow?: boolean
  tooltipContent?: React.ReactNode | RenderFunction
  tooltipPlacement?: 'top' | 'left' | 'right' | 'bottom' | 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight' | 'leftTop' | 'leftBottom' | 'rightTop' | 'rightBottom'
  type?: ButtonType
  onClick?: () => void
  style?: CSSProperties | undefined;
  permissions?: string[]
}

export const SharedButton: React.FC<SharedButtonProps> = React.memo((props) => {
  return (
    (!props.permissions || authService.hasRole(props.permissions)) ?
      <Button
        block={props.block}
        style={props.style}
        className={props.className}
        disabled={props.disabled}
        htmlType={props.htmlType}
        icon={props.icon}
        onClick={props.onClick}
        shape={props.shape}
        size={props.size}
        type={props.type}
      >
        {props.children}
      </Button> : null)
})

export const SharedButtonWithTooltip: React.FC<SharedButtonProps> = React.memo((props) => {
    return (
      (!props.permissions || authService.hasRole(props.permissions)) ?
        <Popover
          arrow={props.tooltipArrow}
          content={props.tooltipContent}
          placement={props.tooltipPlacement}
        >
          <Button
            block={props.block}
            style={props.style}
            className={props.className}
            htmlType={props.htmlType}
            icon={props.icon}
            onClick={props.onClick}
            shape={props.shape}
            size={props.size}
            type={props.type}
          >
            {props.children}
          </Button>
        </Popover> : null)
  }
)
