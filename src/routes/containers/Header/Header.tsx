import React from 'react'
import { useSelector } from 'react-redux'

import type { RootState } from '@/store'
import ProfilePicture from '@/components/passive/ProfilePicture'
import Link from '@/components/active/Link'
import SignOutButton from '@/features/user/components/SignOutButton'

import classes from './Header.module.scss'

interface Props {}

const Header: React.FC<Props> = () => {
  const isSignedIn = useSelector((state: RootState) => !!state.user.data)
  const userName = useSelector((state: RootState) => state.user.data?.username)
  const userAvatar = useSelector((state: RootState) => state.user.data?.image)

  const contents = isSignedIn ? (
    <div className={classes.contents}>
      <Link to="/new-article" appearance="success">
        Create Article
      </Link>
      <Link to="/profile" appearance="none" className={classes.userInfo}>
        <h2 className={classes.userName}>{userName}</h2>
        <ProfilePicture className={classes.profilePic} url={userAvatar ?? ''} />
      </Link>
      <SignOutButton />
    </div>
  ) : (
    <div className={classes.contents}>
      <Link to="/sign-in" appearance="transparent">
        Sign In
      </Link>
      <Link to="/sign-up" appearance="success">
        Sign Up
      </Link>
    </div>
  )

  return (
    <div className={classes.layout}>
      <Link to="/" appearance="none">
        <h1 className={classes.title}>Realworld Blog</h1>
      </Link>
      {contents}
    </div>
  )
}

export default Header
