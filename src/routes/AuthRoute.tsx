import { Navigate, Outlet } from 'react-router-dom'
import React from 'react'
import { PATH_HOME } from '~/routes/paths.ts'
import { userService } from '~/service'

interface AuthProps {
}

export const AuthRoute: React.FC<AuthProps> = () => {
  return userService.isLoggedIn() ? <Outlet /> : <Navigate to={PATH_HOME} />
}
