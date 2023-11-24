import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, type SubmitHandler } from 'react-hook-form'

import type { AppDispatch, RootState } from '@/store'
import setFieldErrors from '@/util/forms/set-field-errors'
import { usernameValidation } from '@/util/forms/validate-username'
import { emailValidation } from '@/util/forms/validate-email'
import { passwordValidation } from '@/util/forms/validate-password'
import { urlValidation } from '@/util/forms/validate-url'
import Form from '@/components/forms/Form'
import TextboxField from '@/components/forms/TextboxField'

import { editProfile } from '../../store/thunks/edit-profile'

interface FormData {
  username: string
  email: string
  password: string
  image: string
}

interface Props {
  className?: string
}

const EditProfileForm: React.FC<Props> = ({ className }) => {
  const dispatch = useDispatch<AppDispatch>()

  const username = useSelector((state: RootState) => state.user.data?.username)
  const email = useSelector((state: RootState) => state.user.data?.email)
  const image = useSelector((state: RootState) => state.user.data?.image)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ defaultValues: { username, email, image } })

  const onSubmit: SubmitHandler<FormData> = async ({
    username,
    email,
    password,
    image,
  }) => {
    const result = await dispatch(
      editProfile({
        username: username || undefined,
        email: email || undefined,
        password: password || undefined,
        image: image || undefined,
      }),
    )

    if (result.status === 'error') {
      setFieldErrors(result.error, setError, [
        'username',
        'email',
        'password',
        'image',
      ])
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

  const passwordField = register('password', { ...passwordValidation })

  const imageField = register('image', { ...urlValidation })

  return (
    <Form
      className={className}
      rootError={errors.root}
      submitMessage="Save"
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
        name="New password"
        register={passwordField}
        error={errors.password}
      />
      <TextboxField
        type="text"
        name="Avatar image (URL)"
        register={imageField}
        error={errors.image}
      />
    </Form>
  )
}

export default EditProfileForm
