import React from 'react'

import StatusDisplay from '@/components/passive/StatusDisplay'

import classes from '../StatusCommon.module.scss'

interface Props {}

const NotFound: React.FC<Props> = () => {
  return (
    <StatusDisplay
      className={classes.content}
      error="not-found"
      entityName="page"
    />
  )
}

export default NotFound
