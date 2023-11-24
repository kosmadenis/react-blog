import type { Path, UseFormSetError } from 'react-hook-form'
import { capitalize } from 'lodash-es'

export default function setFieldErrors<FormData extends object>(
  errors: any,
  setError: UseFormSetError<FormData>,
  knownFields: (keyof FormData)[],
) {
  let hasErrorsForKnownFields = false

  if (typeof errors === 'object' && errors !== null) {
    const errorsKeys = Object.keys(errors)

    // 1. Each `errors` field may correspond to a form field...
    errorsKeys.forEach((key) =>
      // ...or contain a compound field error.
      key.split(' or ').forEach((fieldName: unknown) => {
        // 2. FieldName is type-checked here to make sure it's `keyof FormData`...
        // (Array.includes() doesn't have `is` signature)
        if (knownFields.includes(fieldName as any)) {
          const value = errors[key]
          const message = value && `${capitalize(key)} ${value}`
          // ...so it is known to be `Path<FormData>` here
          setError(fieldName as Path<FormData>, { type: 'server', message })

          hasErrorsForKnownFields = true
        }
      }),
    )
  }

  if (!hasErrorsForKnownFields) {
    // Server reported error without any known fields.
    // Some kind of an error should be set still, to
    // give user the feedback that something went wrong.
    setError('root', { type: 'server', message: 'Invalid form data' })
  }
}
