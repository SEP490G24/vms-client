import React, { useState } from 'react'
import { Content, LayoutWrapper, Wrapper } from './styles'
import SideBar from '../SideBar/SideBar'
import { Header } from '../Header'

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }) => {

  const [collapsed, setCollapsed] = useState(true)

  return (
    <LayoutWrapper className={'flex min-h-screen overflow-hidden'} style={{backgroundColor:"#f5f4f4"}}>
      <SideBar collapsed={collapsed} />
      <Wrapper className={'w-full pt-0 px-8'}>
        <Header collapsed={collapsed} toggleCollapsed={setCollapsed} />
        {/*<PerfectScrollbar>*/}
        <Content>{children}</Content>
        {/*</PerfectScrollbar>*/}
      </Wrapper>
    </LayoutWrapper>
  )
}

export default DefaultLayout
