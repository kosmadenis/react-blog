import React from 'react'
import clsx from 'clsx'
import { Link as RouterLink } from 'react-router-dom'

import classes from './Link.module.scss'

type LinkAppearance = 'none' | 'inline' | 'success' | 'danger' | 'transparent'

interface Props {
  className?: string
  appearance?: LinkAppearance
  to: string
}

const Link: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  appearance = 'inline',
  to,
  children,
}) => {
  const linkClasses = clsx(
    className,
    classes.base,
    appearance !== 'inline' && classes.block,
    appearance !== 'none' && classes[appearance],
  )

  return (
    <RouterLink className={linkClasses} to={to}>
      {children}
    </RouterLink>
  )
}

export default Link
