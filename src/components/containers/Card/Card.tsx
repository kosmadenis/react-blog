import React from 'react'
import clsx from 'clsx'

import classes from './Card.module.scss'

interface Props {
  className?: string
  title?: string
  footer?: React.ReactNode
}

const Card: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  title,
  footer,
  children,
}) => {
  return !!title || !!footer ? (
    <div className={clsx(className, classes.base, classes.layout)}>
      {title && <h3 className={classes.title}>{title}</h3>}
      {children}
      {footer && <div className={classes.footer}>{footer}</div>}
    </div>
  ) : (
    <div className={clsx(className, classes.base)}>{children}</div>
  )
}

export default Card
