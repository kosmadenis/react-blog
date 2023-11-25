import React from 'react'
import clsx from 'clsx'
import { format } from 'date-fns'
import { useSelector } from 'react-redux'

import type { RootState } from '@/store'
import ProfilePicture from '@/components/widgets/ProfilePicture'

import ArticleButtons from '../ArticleButtons'

import classes from './ArticleMetadata.module.scss'

function formatDate(date: string) {
  if (!date) {
    return 'N/A'
  }

  try {
    const dateObj = new Date(date)
    return format(dateObj, 'dd MMMM yyyy')
  } catch {
    return 'N/A'
  }
}

interface Props {
  className?: string
  full?: boolean
  slug: string
  username: string
  date: string
  picture: string
}

const ArticleMetadata: React.FC<Props> = ({
  className,
  full,
  slug,
  username,
  date,
  picture,
}) => {
  const currentUser = useSelector(
    (state: RootState) => state.user.data?.username,
  )

  const shouldDisplayButtons =
    !!full && !!currentUser && !!username && currentUser === username

  const formattedDate = formatDate(date)

  return (
    <div className={clsx(className, classes.layout)}>
      <h3 className={classes.username}>{username}</h3>
      <h4 className={classes.date}>{formattedDate}</h4>
      <ProfilePicture className={classes.profilePic} url={picture} />
      {shouldDisplayButtons && (
        <ArticleButtons className={classes.buttons} slug={slug} />
      )}
    </div>
  )
}

export default ArticleMetadata
