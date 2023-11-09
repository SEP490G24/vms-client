import { Route, Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { DefaultLayout } from '~/layouts'
import { themeSelector, useAppSelector } from './redux'
import { AuthRoute, privateRoutes } from './routes'
import { GlobalStyles } from './themes'
import { ConfigProvider } from 'antd'
import React, { useLayoutEffect, useState } from 'react'
import { BrowserHistory, createBrowserHistory } from 'history'

const history = createBrowserHistory()

type Props = {
  basename?: string;
  children: React.ReactNode;
  history: BrowserHistory;
}

function App() {
  const selectedTheme = useAppSelector(themeSelector)

  const CustomRouter = ({ basename, children, history }: Props) => {
    const [state, setState] = useState({
      action: history.action,
      location: history.location
    })

    useLayoutEffect(() => history.listen(setState), [history])

    return (
      <Router
        basename={basename}
        location={state.location}
        navigator={history}
        navigationType={state.action}
      >
        {children}
      </Router>
    )
  }

  return (
    <ThemeProvider theme={selectedTheme.themes}>
      <GlobalStyles />
      <ConfigProvider
        theme={{
          components: {
            Button: {
              controlItemBgActiveDisabled: selectedTheme.themes.disabled,
              controlHeight: 32
            }
          }
        }}
      >
        <CustomRouter history={history} basename={window.__RUNTIME_CONFIG__.VITE_BASE_PATH}>
          <Routes>
            <Route element={<AuthRoute />}>
              {/*<Route path={'/profile'} element={<DefaultLayout><Profile /></DefaultLayout>}>*/}
              {/*  <Route path={'/profile/info'} element={<ProfileInfo />} />*/}
              {/*  <Route path={'/profile/security'} element={<ProfileSecurity />} />*/}
              {/*</Route>*/}
              {privateRoutes.map((route, index) => {
                const Page = route.component
                const Layout = route.layout || DefaultLayout
                return (
                  <Route
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                    key={index}
                  />
                )
              })}
            </Route>
            {/*<Route>*/}
            {/*  {publicRoutes.map((route, index) => {*/}
            {/*    const Page = route.components*/}
            {/*    return (*/}
            {/*      <Route*/}
            {/*        path={route.path}*/}
            {/*        element={*/}
            {/*          <AuthLayout>*/}
            {/*            <Page />*/}
            {/*          </AuthLayout>*/}
            {/*        }*/}
            {/*        key={index}*/}
            {/*      />*/}
            {/*    )*/}
            {/*  })}*/}
            {/*</Route>*/}
          </Routes>
        </CustomRouter>
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default App
