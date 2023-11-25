import React, { useState } from 'react'
import { Content, ContentWrapper, LayoutWrapper, Wrapper } from './styles'
import SideBar from '../SideBar/SideBar'
import { Header } from '../Header'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {

  const [collapsed, setCollapsed] = useState(true)

  return (
    <LayoutWrapper className={'flex bg-body min-h-screen overflow-hidden'}>
      <SideBar collapsed={collapsed} />
      <Wrapper className={'w-full pt-0 px-8'}>
        <Header collapsed={collapsed} toggleCollapsed={setCollapsed} />
        <ContentWrapper collapsed={collapsed}>
          <Content>{children}</Content>
        </ContentWrapper>
      </Wrapper>
    </LayoutWrapper>
  )
}

export default DefaultLayout
