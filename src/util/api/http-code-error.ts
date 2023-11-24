export default class HttpCodeError extends Error {
  code: number

  body: any

  constructor(code: number, body: any) {
    super(`Non-2xx HTTP response code ${code}`)

    this.code = code
    this.body = body
  }
}

async function tryParseBody(response: Response) {
  try {
    const data = await response.json()
    return data
  } catch {
    return null
  }
}

export async function expectCode(response: Response) {
  if (!response.ok) {
    const body = await tryParseBody(response)
    throw new HttpCodeError(response.status, body)
  }
}
