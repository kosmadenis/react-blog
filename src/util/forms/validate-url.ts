import type { Validation } from './types'
import validateDomain from './validate-domain'

// Validate a web (http(s)) URL
function validateURL(value: string): true | string {
  let url: URL

  // Must be a URL

  try {
    url = new URL(value)
  } catch {
    return 'Invalid URL'
  }

  // With http(s) schema

  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    return 'Invalid URL (must start with http:// or https://)'
  }

  // And a valid DNS hostame (no IDN)

  const domainValid = validateDomain(url.host)

  if (domainValid !== true) {
    return `Invalid URL (${domainValid})`
  }

  return true
}

export const urlValidation: Validation<string> = {
  validate: (value) => !value || validateURL(value),
}
