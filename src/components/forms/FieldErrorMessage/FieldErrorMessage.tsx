import React from 'react'
import clsx from 'clsx'
import type { FieldError, FieldErrors } from 'react-hook-form'

import classes from './FieldErrorMessage.module.scss'

interface Props {
  className?: string
  error?: FieldError | FieldErrors['root']
}

const FieldErrorMessage: React.FC<Props> = ({ className, error }) => {
  if (!error || !error.message) {
    return null
  }

  return (
    <span className={clsx(className, classes.layout)}>{error.message}</span>
  )
}

export default FieldErrorMessage
