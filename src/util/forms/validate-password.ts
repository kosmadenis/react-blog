import type { Validation } from './types'

export const passwordValidation: Validation<string> = {
  minLength: {
    value: 6,
    message: 'Password needs to be at least 6 characters',
  },
  maxLength: {
    value: 40,
    message: 'Password needs to be no longer than 40 characters',
  },
}
