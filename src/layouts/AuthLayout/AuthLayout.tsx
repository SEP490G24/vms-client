import React from 'react'

import { AuthLayoutWrapper } from './styles'

interface AuthLayoutProps {
  children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return <AuthLayoutWrapper>{children}</AuthLayoutWrapper>
}

export default AuthLayout
