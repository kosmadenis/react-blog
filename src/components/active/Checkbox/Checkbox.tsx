import React from 'react'
import clsx from 'clsx'
import type { UseFormRegisterReturn } from 'react-hook-form'

import classes from './Checkbox.module.scss'

interface Props {
  className?: string
  register?: UseFormRegisterReturn<any>
}

const Checkbox: React.FC<Props> = ({ className, register }) => {
  return (
    <input
      {...register}
      type="checkbox"
      className={clsx(className, classes.layout)}
    />
  )
}

export default Checkbox
