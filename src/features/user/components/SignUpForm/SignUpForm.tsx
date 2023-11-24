import React from 'react'
import { useDispatch } from 'react-redux'
import { useForm, type SubmitHandler } from 'react-hook-form'

import setFieldErrors from '@/util/forms/set-field-errors'
import { usernameValidation } from '@/util/forms/validate-username'
import { emailValidation } from '@/util/forms/validate-email'
import { passwordValidation } from '@/util/forms/validate-password'
import type { AppDispatch } from '@/store'
import Form from '@/components/forms/Form'
import FormDivider from '@/components/forms/FormDivider'
import TextboxField from '@/components/forms/TextboxField'
import CheckboxField from '@/components/forms/CheckboxField'

import { createAccount } from '../../store/thunks/create-account'

interface FormData {
  username: string
  email: string
  password: string
  passwordRepeat: string
  termsAccepted: boolean
}

interface Props {
  className?: string
}

const SignUpForm: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>()

  const onSubmit: SubmitHandler<FormData> = async ({
    email,
    username,
    password,
  }) => {
    const result = await dispatch(createAccount({ email, username, password }))

    if (result.status === 'error') {
      setFieldErrors(result.error, setError, ['email', 'username', 'password'])
    }
  }

  const usernameField = register('username', {
    ...usernameValidation,
    required: 'Username is required',
  })

  const emailField = register('email', {
    ...emailValidation,
    required: 'Email is required',
  })

  const passwordField = register('password', {
    ...passwordValidation,
    required: 'Password is required',
    deps: ['passwordRepeat'],
  })

  const passwordRepeatField = register('passwordRepeat', {
    validate: (value, form) =>
      value === form.password || 'Passwords must match',
  })

  const termsField = register('termsAccepted', {
    required: 'You must agree to the processing of your personal information',
  })

  return (
    <Form
      className={className}
      rootError={errors.root}
      submitMessage="Create"
      onSubmit={handleSubmit(onSubmit)}
      isLoading={isSubmitting}
    >
      <TextboxField
        type="text"
        autoComplete="username"
        name="Username"
        register={usernameField}
        error={errors.username}
      />
      <TextboxField
        type="email"
        autoComplete="email"
        name="Email address"
        register={emailField}
        error={errors.email}
      />
      <TextboxField
        type="password"
        autoComplete="new-password"
        name="Password"
        register={passwordField}
        error={errors.password}
      />
      <TextboxField
        type="password"
        autoComplete="new-password"
        name="Repeat password"
        register={passwordRepeatField}
        error={errors.passwordRepeat}
      />
      <FormDivider />
      <CheckboxField
        text="I agree to the processing of my personal information"
        register={termsField}
        error={errors.termsAccepted}
      />
    </Form>
  )
}

export default SignUpForm
