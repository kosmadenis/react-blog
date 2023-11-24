import React from 'react'

import Link from '@/components/active/Link'
import Card from '@/components/containers/Card'

import SignInForm from '../../components/SignInForm'

import classes from './SignIn.module.scss'

interface Props {}

const SignIn: React.FC<Props> = () => {
  const cardFooter = (
    <>
      Don&apos;t have an account? <Link to="/sign-up">Sign Up</Link>.
    </>
  )

  return (
    <div className={classes.layout}>
      <Card className={classes.card} title="Sign In" footer={cardFooter}>
        <SignInForm />
      </Card>
    </div>
  )
}

export default SignIn
