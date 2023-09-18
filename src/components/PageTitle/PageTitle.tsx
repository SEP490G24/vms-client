import React from 'react'
import { PageTitleWrapper } from './styles'
import Title from 'antd/es/typography/Title'

interface PageTitleProps {
  title: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = React.memo((props) => {
  return (
    <PageTitleWrapper>
      <Title level={3} className={'mb-[42px]'}>{props.title}</Title>
    </PageTitleWrapper>
  )
})
