import React from 'react'
import clsx from 'clsx'

import classes from './ProfilePicture.module.scss'

interface Props {
  className?: string
  url: string
}

const ProfilePicture: React.FC<Props> = ({ className, url }) => {
  return (
    <div className={clsx(className, classes.box)}>
      <img className={classes.image} src={url} alt="Profile pic" />
    </div>
  )
}

export default ProfilePicture
