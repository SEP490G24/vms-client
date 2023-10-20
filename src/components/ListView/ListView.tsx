import React from 'react'
import { ListViewItem, ListViewWrapper } from './styles'

interface ListViewProps {
  title?: React.ReactNode;
  children: React.ReactNode
}

export const ListView: React.FC<ListViewProps> = React.memo((props) => {
  return (
    <ListViewWrapper className={'h-full flex justify-between flex-col list-square text-primary-normal ml-5'}>
      {React.Children.map(props.children, child => {
        return (<ListViewItem>
          {child}
        </ListViewItem>)
      })}
    </ListViewWrapper>
  )
})