import React from 'react'

import Link from '@/components/active/Link'
import Card from '@/components/containers/Card'

import SignUpForm from '../../components/SignUpForm'

import classes from './SignUp.module.scss'

interface Props {}

const SignUp: React.FC<Props> = () => {
  const cardFooter = (
    <>
      Already have an account? <Link to="/sign-in">Sign In</Link>.
    </>
  )

  return (
    <div className={classes.layout}>
      <Card
        className={classes.card}
        title="Create new account"
        footer={cardFooter}
      >
        <SignUpForm />
      </Card>
    </div>
  )
}

export default SignUp
