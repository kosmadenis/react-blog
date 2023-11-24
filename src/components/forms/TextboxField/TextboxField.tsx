import React from 'react'
import clsx from 'clsx'
import type { FieldError, UseFormRegisterReturn } from 'react-hook-form'

import Textbox, {
  type InputAutoComplete,
  type InputType,
} from '@/components/active/Textbox'

import FieldErrorMessage from '../FieldErrorMessage'

import classes from './TextboxField.module.scss'

interface Props {
  className?: string
  type: InputType
  autoComplete?: InputAutoComplete
  name: string
  placeholder?: string
  register: UseFormRegisterReturn<any>
  error?: FieldError
}

const TextboxField: React.FC<Props> = ({
  className,
  type,
  autoComplete,
  name,
  placeholder,
  register,
  error,
}) => {
  return (
    <label className={clsx(className, classes.layout)}>
      <span className={classes.name}>{name}</span>
      <Textbox
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder ?? name}
        invalid={!!error}
        register={register}
      />
      <FieldErrorMessage error={error} />
    </label>
  )
}

export default TextboxField
