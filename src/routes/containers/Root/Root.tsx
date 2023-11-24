import React from 'react'
import { Outlet } from 'react-router-dom'

import Header from './Header'
import classes from './Root.module.scss'

interface Props {}

const Root: React.FC<Props> = () => {
  return (
    <div className={classes.layout}>
      <Header />
      <Outlet />
    </div>
  )
}

export default Root
