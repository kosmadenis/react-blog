import React, { type PropsWithChildren } from 'react'
import clsx from 'clsx'
import type { FieldErrors } from 'react-hook-form'

import Button from '@/components/active/Button'

import FieldErrorMessage from '../FieldErrorMessage'

import classes from './Form.module.scss'

interface Props {
  className?: string
  rootError?: FieldErrors<any>['root']
  isLoading?: boolean
  submitMessage: React.ReactNode
  onSubmit: React.DOMAttributes<HTMLFormElement>['onSubmit']
}

const Form: React.FC<PropsWithChildren<Props>> = ({
  className,
  rootError,
  submitMessage,
  onSubmit,
  isLoading,
  children,
}) => {
  return (
    <form className={clsx(className, classes.layout)} onSubmit={onSubmit}>
      {children}
      <FieldErrorMessage error={rootError} />
      <Button className={classes.submit} type="submit" loading={isLoading}>
        {submitMessage}
      </Button>
    </form>
  )
}

export default Form
