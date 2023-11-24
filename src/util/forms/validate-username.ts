import type { Validation } from './types'

const usernameRegExp = /^[a-z0-9]*$/

export const usernameValidation: Validation<string> = {
  minLength: {
    value: 3,
    message: 'Username needs to be at least 3 characters',
  },
  maxLength: {
    value: 20,
    message: 'Username needs to be no longer than 20 characters',
  },
  pattern: {
    value: usernameRegExp,
    message: 'Username can only contain numbers and lowercase latin characters',
  },
}
