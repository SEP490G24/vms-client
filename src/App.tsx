import { Route, Router, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'

import { DefaultLayout } from '~/layouts'
import {
  fetchMyOrganization,
  fetchProfile,
  fetchProvince,
  findAllSitesInOrganization,
  themeSelector,
  useAppSelector
} from './redux'
import { getAcceptedPrivateRoutes, getAllPrivateRouters } from './routes'
import { GlobalStyles, ResetMui } from './themes'
import { ConfigProvider } from 'antd'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { BrowserHistory, createBrowserHistory } from 'history'
import { AuthRoute } from '~/auth'
import { authService } from '~/service'
import { Forbidden, NotFound } from '~/pages'
import { useDispatch } from 'react-redux'
import { checkPermission } from '~/utils'
import { SCOPE_ROLE_MAP } from '~/role'

const history = createBrowserHistory()

type Props = {
  basename?: string;
  children: React.ReactNode;
  history: BrowserHistory;
}

function App() {
  const selectedTheme = useAppSelector(themeSelector)
  const dispatch = useDispatch()

  useEffect(() => {
    if (checkPermission(SCOPE_ROLE_MAP.SCOPE_ORGANIZATION)) {
      dispatch(findAllSitesInOrganization() as any)
      dispatch(fetchMyOrganization() as any)
    }
    dispatch(fetchProfile() as any)
    dispatch(fetchProvince() as any)
  }, [])

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

  const acceptedPrivateRoutes = getAcceptedPrivateRoutes()
  const allPrivateRoutes = getAllPrivateRouters()

  return (
    <ThemeProvider theme={selectedTheme.themes}>
      <GlobalStyles />
      <ResetMui />
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
        {acceptedPrivateRoutes.length == 0 && <Forbidden />}
        {acceptedPrivateRoutes.length > 0 &&
          <CustomRouter history={history} basename={window.__RUNTIME_CONFIG__.VITE_BASE_PATH}>
            <Routes>
              <Route element={<AuthRoute />}>
                {allPrivateRoutes.map((route, index) => {
                  const Page = route.component
                  const Layout = route.layout || DefaultLayout
                  return (
                    <Route
                      path={route.path}
                      element={
                        authService.hasRole(route.role) ? (
                          <Layout>
                            <Page />
                          </Layout>
                        ) : (
                          <Forbidden />
                        )
                      }
                      key={index}
                    />
                  )
                })}
              </Route>
              <Route path='*' element={<NotFound />} />
            </Routes>
          </CustomRouter>
        }
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default App
