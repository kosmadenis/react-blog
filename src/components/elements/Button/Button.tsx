import React from 'react'
import clsx from 'clsx'

import Spinner from '@/components/passive/Spinner'

import classes from './Button.module.scss'

function getAppearanceForType(type: ButtonType): ButtonAppearance {
  switch (type) {
    case 'submit':
      return 'submit'
    case 'reset':
      return 'cancel'
    default:
      return 'info'
  }
}

type ButtonAppearance = 'submit' | 'cancel' | 'info' | 'danger' | 'black'

type ButtonType = HTMLButtonElement['type']

interface Props {
  className?: string
  appearance?: ButtonAppearance
  type?: ButtonType
  loading?: boolean
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick']
}

const Button: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  appearance,
  type = 'button',
  loading,
  onClick,
  children,
}) => {
  const appearanceOrDefault = appearance ?? getAppearanceForType(type)

  const buttonClasses = clsx(
    className,
    classes.layout,
    classes[appearanceOrDefault],
  )

  return (
    // eslint-disable-next-line react/button-has-type
    <button className={buttonClasses} type={type} onClick={onClick}>
      {loading ? <Spinner className={classes.spinner} /> : children}
    </button>
  )
}

export default Button
