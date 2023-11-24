import React from 'react'
import clsx from 'clsx'

import classes from './FormDivider.module.scss'

interface Props {
  className?: string
}

const FormDivider: React.FC<Props> = ({ className }) => {
  return <div className={clsx(className, classes.layout)} />
}

export default FormDivider
