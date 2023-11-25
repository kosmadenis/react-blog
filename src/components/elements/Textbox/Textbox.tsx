import React from 'react'
import clsx from 'clsx'
import type { UseFormRegisterReturn } from 'react-hook-form'

import classes from './Textbox.module.scss'

export type InputType = 'text' | 'email' | 'password' | 'area'

export type InputAutoComplete =
  | 'username'
  | 'email'
  | 'new-password'
  | 'current-password'

interface Props {
  className?: string
  type: InputType
  autoComplete?: InputAutoComplete
  placeholder?: string
  invalid?: boolean
  register?: UseFormRegisterReturn<any>
}

const Textbox: React.FC<Props> = ({
  className,
  type,
  autoComplete,
  placeholder,
  invalid,
  register,
}) => {
  const inputClasses = clsx(
    className,
    classes.layout,
    invalid && classes.invalid,
  )

  return type === 'area' ? (
    <textarea
      className={inputClasses}
      placeholder={placeholder}
      {...register}
    />
  ) : (
    <input
      className={inputClasses}
      type={type}
      autoComplete={autoComplete}
      placeholder={placeholder}
      {...register}
    />
  )
}

export default Textbox
