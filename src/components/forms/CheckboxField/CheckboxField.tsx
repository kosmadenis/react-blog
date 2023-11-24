import React from 'react'
import clsx from 'clsx'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import Checkbox from '@/components/active/Checkbox'

import FieldErrorMessage from '../FieldErrorMessage'

import classes from './CheckboxField.module.scss'

interface Props {
  className?: string
  text: string
  register: UseFormRegisterReturn<any>
  error?: FieldError
}

const CheckboxField: React.FC<Props> = ({
  className,
  text,
  register,
  error,
}) => {
  return (
    <label className={clsx(className, classes.layout)}>
      <Checkbox className={classes.checkbox} register={register} />
      <span className={classes.text}>{text}</span>
      <br />
      <FieldErrorMessage className={classes.error} error={error} />
    </label>
  )
}

export default CheckboxField
