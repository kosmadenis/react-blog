import React from 'react'
import clsx from 'clsx'
import { capitalize } from 'lodash-es'

import type { FetchError } from '@/store/fetch'
import Spinner from '@/components/elements/Spinner'
import Button from '@/components/elements/Button'
import Link from '@/components/elements/Link'

import classes from './StatusDisplay.module.scss'

interface BaseProps {
  loading?: boolean
  error?: FetchError | 'forbidden'
  entityName?: string
  retry?: (() => void) | false | null
}

const StatusDisplayBase: React.FC<BaseProps> = ({
  loading,
  error,
  entityName,
  retry,
}) => {
  if (loading) {
    return <Spinner className={classes.spinner} />
  }

  if (error === 'not-found') {
    return (
      <>
        <h1 className={classes.title}>
          {entityName ? `${capitalize(entityName)} not found` : 'Not found'}
        </h1>
        <Link to="/">Return to the main page</Link>
      </>
    )
  }

  if (error === 'forbidden') {
    return (
      <>
        <h1 className={classes.title}>
          You must be authorized in order to view this page
        </h1>
        <span>
          <Link to="/sign-in">Sign in</Link> or{' '}
          <Link to="/sign-up">sign up</Link>
        </span>
      </>
    )
  }

  return (
    <>
      <h1 className={classes.title}>
        {entityName ? `Error loading ${entityName}` : 'Something went wrong...'}
      </h1>
      {error !== 'http-code' && retry && (
        <Button onClick={retry}>Try again</Button>
      )}
    </>
  )
}

interface Props extends BaseProps {
  className?: string
}

const StatusDisplay: React.FC<Props> = ({ className, ...rest }) => {
  return (
    <div className={clsx(className, classes.layout)}>
      <StatusDisplayBase {...rest} />
    </div>
  )
}

export default StatusDisplay
