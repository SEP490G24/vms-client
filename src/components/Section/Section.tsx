import React from 'react'
import { SectionWrapper } from './styles'
import Title from 'antd/es/typography/Title'
import { Card } from 'antd'

interface PageTitleProps {
  title?: React.ReactNode | string;
  children?: React.ReactNode | string;
}

export const Section: React.FC<PageTitleProps> = React.memo((props) => {
  return (
    <SectionWrapper>
      {props.title && <Title level={5} className={'flex items-center mb-2'}>{props.title}</Title>}
      <Card bodyStyle={{padding: '20px 116px'}}>{props.children}</Card>
    </SectionWrapper>
  )
})
