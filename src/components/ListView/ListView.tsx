import React from 'react'
import { ListViewItem, ListViewWrapper } from './styles'

interface ListViewProps {
  title?: React.ReactNode;
  children: React.ReactNode;
  className?: string
}

export const ListView: React.FC<ListViewProps> = React.memo((props) => {
  return (
    <ListViewWrapper className={props.className + ' h-full flex justify-between flex-col list-disc text-primary-normal ml-5'}>
      {React.Children.map(props.children, child => {
        return (<ListViewItem>
          {child}
        </ListViewItem>)
      })}
    </ListViewWrapper>
  )
})
