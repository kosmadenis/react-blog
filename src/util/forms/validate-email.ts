import type { Validation } from './types'
import validateDomain from './validate-domain'

const addressRegExp = /^(?:[a-zA-Z0-9](?:[-_.a-zA-Z0-9]*[a-zA-Z0-9])?)$/

// Validate an email address
function validateEmail(value: string): true | string {
  const parts = value.split('@')

  if (parts.length !== 2) {
    return 'Invalid email'
  }

  const [address, domain] = parts

  const domainValid = validateDomain(domain)

  if (domainValid !== true) {
    return `Invalid email (${domainValid})`
  }

  if (!RegExp(addressRegExp).test(address)) {
    return `Invalid email (invalid address)`
  }

  return true
}

export const emailValidation: Validation<string> = {
  validate: (value) => !value || validateEmail(value),
}
