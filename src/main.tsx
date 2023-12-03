// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import store, { persist } from './redux/store.ts'
import './i18n/i18n.ts'
import { authService } from '~/service'

const renderApp = () => ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persist}>
      <App />
    </PersistGate>
  </Provider>
  // </React.StrictMode>,
)

authService.initKeycloak(renderApp)

