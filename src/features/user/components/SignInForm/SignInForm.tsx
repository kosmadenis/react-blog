import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, type SubmitHandler } from 'react-hook-form'

import setFieldErrors from '@/util/forms/set-field-errors'
import type { AppDispatch } from '@/store'
import { emailValidation } from '@/util/forms/validate-email'
import Form from '@/components/forms/Form'
import TextboxField from '@/components/forms/TextboxField'

import { logIn } from '../../store/thunks/log-in'

interface FormData {
  email: string
  password: string
}

interface Props {
  className?: string
}

const SignInForm: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const result = await dispatch(logIn(data))

    if (result.status === 'error') {
      setFieldErrors(result.error, setError, ['email', 'password'])
    }
  }

  const emailField = register('email', {
    ...emailValidation,
    required: 'Email is required',
  })

  const passwordField = register('password', {
    required: 'Password is required',
  })

  return (
    <Form
      className={className}
      rootError={errors.root}
      submitMessage="Login"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isSubmitting}
    >
      <TextboxField
        type="email"
        autoComplete="email"
        name="Email address"
        register={emailField}
        error={errors.email}
      />
      <TextboxField
        type="password"
        autoComplete="current-password"
        name="Password"
        register={passwordField}
        error={errors.password}
      />
    </Form>
  )
}

export default SignInForm
