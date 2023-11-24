import React from 'react'

import StatusDisplay from '@/components/passive/StatusDisplay'

import classes from '../StatusCommon.module.scss'

interface Props {}

const GenericError: React.FC<Props> = () => {
  return <StatusDisplay className={classes.content} error="other" />
}

export default GenericError
