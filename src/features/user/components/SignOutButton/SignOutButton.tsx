import React from 'react'
import { useDispatch } from 'react-redux'

import type { AppDispatch } from '@/store'
import Button from '@/components/elements/Button'

import { logOut } from '../../store/thunks/log-out'

interface Props {}

const SignOutButton: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>()

  const signOut = () => {
    dispatch(logOut())
  }

  return (
    <Button appearance="black" onClick={signOut}>
      Sign Out
    </Button>
  )
}

export default SignOutButton
