import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { PATH_DASHBOARD } from '~/routes/paths'
import { authService } from '~/service'

interface AuthProps {}

export const AuthRoute: React.FC<AuthProps> = () => {
  return authService.isLoggedIn() ? <Outlet /> : <Navigate to={PATH_DASHBOARD} />
}
