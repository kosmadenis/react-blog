export function isAbortError(error: any): boolean {
  return (
    error instanceof DOMException &&
    (error.code === DOMException.ABORT_ERR || error.name === 'AbortError')
  )
}
