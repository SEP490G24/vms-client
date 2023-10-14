import React from 'react'
import { Content, LayoutWrapper, Wrapper } from './styles'
import SideBar from '../SideBar/SideBar'
import { Header } from '../Header'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <LayoutWrapper className={'flex bg-body min-h-screen overflow-hidden'}>
      <SideBar />
      <Wrapper className={'w-full pt-0 p-8'}>
        <Header />
        <Content>{children}</Content>
      </Wrapper>
    </LayoutWrapper>
  )
}

export default DefaultLayout
