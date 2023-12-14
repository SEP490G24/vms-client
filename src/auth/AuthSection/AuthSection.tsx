import React from 'react'
import { authService } from '~/service'

export interface AuthSectionProps {
  permissions: string[]
  children: React.ReactNode
}

const AuthSection: React.FC<AuthSectionProps> = (props) => {
  const { children, permissions } = props
  return <>{authService.hasRole(permissions) ? children : undefined}</>
}

export default AuthSection
