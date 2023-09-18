import { Button } from 'antd'
import React from 'react'
import { BarsOutlined, ChevronDownOutlined, RefreshOutlined, SearchOutlined } from '~/icon'
import { ShareAltOutlined } from '@ant-design/icons'
import { ButtonType } from 'antd/es/button'

interface SharedButtonProps {
  children?: React.ReactNode | string
  size?: 'large' | 'middle' | 'small'
  type?:  ButtonType
  theme?: 'secondary' | 'add' | 'view' | 'sidebar' | 'search' | 'refresh' | 'move' | 'special' | 'default'
  onClick?: () => void
  block?: boolean
  className?: string
}

export const SharedButton: React.FC<SharedButtonProps> = React.memo(
  ({ children, size, onClick, type, theme, block, className }) => {
    switch (theme) {
      case 'secondary':
        return <Button
          className={`text-white bg-secondary-normal hover:bg-secondary-hover hover:border-secondary-hover active:bg-secondary-active py-0 px-9 ${className} `}
          type={type} size={size} onClick={onClick} block={block}>{children}
        </Button>
      case 'add':
        return <Button
          className={`bg-primary-light hover:bg-[#2f82fd] active:bg-[#0048a5] text-primary-normal hover:text-white active:text-white py-0 px-9 font-bold ${className} `}
          type={type} size={size} onClick={onClick} block={block}>{children}</Button>
      case 'view':
        return <Button className={`bg-[#e6edff] hover:bg-[#7298b8] active:bg-[#708698] py-0 px-9 ${className} `}
                       type={type} size={size} onClick={onClick} block={block}>{children}</Button>
      case 'sidebar':
        return <Button
          className={`rounded-full flex justify-center items-center text-primary-normal hover:text-white active:text-white bg-primary-light hover:bg-[#2f82fd] active:bg-[#0048a5] ${className} `}
          type={type} size={size} onClick={onClick} block={block}>
          <ChevronDownOutlined className={'text-[20px] rotate-90'} />
          {children}
        </Button>
      case 'search':
        return <Button
          className={`text-primary-normal hover:text-white active:text-white bg-primary-light hover:bg-[#2f82fd] active:bg-[#0048a5] ${className} `}
          type={type} size={size} onClick={onClick} block={block}>
          <SearchOutlined />
          {children}
        </Button>
      case 'refresh':
        return <Button
          className={`p-0 rounded-full flex justify-center items-center bg-secondary-normal hover:bg-secondary-hover active:bg-secondary-active ${className} `}
          type={type} size={size} onClick={onClick} block={block}>
          <RefreshOutlined />
          {children}
        </Button>
      case 'move':
        return <Button
          className={`text-muted hover:text-primary-normal active:text-white bg-transparent shadow-none hover:bg-primary-light active:bg-primary-normal ${className} `}
          type={type} size={size} onClick={onClick} block={block}>
          <BarsOutlined className={'text-[16px]'} />
          {children}
        </Button>
      case 'special':
        return <Button
          className={`flex items-center text-white bg-primary-normal hover:bg-primary-hover active:bg-primary-active px-4 ${className} `}
          type={type} size={size} onClick={onClick} block={block}>
          <ShareAltOutlined className={'text-xl px-1'} />
          <span>Connection TEST</span>
        </Button>
      default:
      case 'default':
        return <Button
          className={`bg-primary-normal hover:bg-primary-hover active:bg-primary-active text-white py-0 px-9 ${className} `}
          type={type} size={size} onClick={onClick} block={block}>{children}
        </Button>
    }
  }
)
