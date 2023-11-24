import HttpCodeError from '@/util/api/http-code-error'

// Serialized fetch error
export type FetchError = 'not-found' | 'http-code' | 'other'

function serializeError(error: unknown): FetchError {
  if (!(error instanceof HttpCodeError)) {
    return 'other'
  }

  if (error.code !== 404) {
    return 'http-code'
  }

  return 'not-found'
}

export function extractError(error: unknown) {
  const serialized = serializeError(error)
  const contents = error instanceof HttpCodeError ? error.body?.errors : null

  return { serialized, contents }
}
