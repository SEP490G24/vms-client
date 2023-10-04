import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { PATH_DASHBOARD } from '~/routes/paths.ts'
import { userService } from '~/service'

interface AuthProps {
}

export const AuthRoute: React.FC<AuthProps> = () => {
  return userService.isLoggedIn() ? <Outlet /> : <Navigate to={PATH_DASHBOARD} />
}
