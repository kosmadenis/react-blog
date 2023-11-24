import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import type { RootState } from '@/store'
import Forbidden from '@/routes/status/Forbidden'

export type AuthState = 'logged-in' | 'not-logged-in'

const withAuth =
  <Props,>(requiredState: AuthState, Component: React.ComponentType<Props>) =>
  (props: Props & React.JSX.IntrinsicAttributes) => {
    const isLoggedIn = useSelector((state: RootState) => !!state.user.data)

    if (requiredState === 'logged-in' && !isLoggedIn) {
      return <Forbidden />
    }

    if (requiredState === 'not-logged-in' && isLoggedIn) {
      return <Navigate to="/" />
    }

    return <Component {...props} />
  }

export default withAuth
