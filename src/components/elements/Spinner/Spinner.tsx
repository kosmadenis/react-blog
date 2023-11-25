import React from 'react'

import classes from './Spinner.module.scss'

interface Props {
  className?: string
}

const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      className={className}
    >
      <path
        className={classes.spinner}
        d="M 12.000219,21.248267 A 9.2505322,9.2486401 0 0 1 3.4538421,15.538929 9.2505322,9.2486401 0 0 1 5.4591052,5.4598511 9.2505322,9.2486401 0 0 1 15.540245,3.4549978 9.2505322,9.2486401 0 0 1 21.250751,11.999627"
      />
    </svg>
  )
}

Spinner.defaultProps = {
  className: '',
}

export default Spinner
