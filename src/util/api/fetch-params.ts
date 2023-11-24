export default class FetchParams {
  headers: { [key: string]: string } = {}

  method?: string

  body?: string

  signal?: AbortSignal

  // Method setters

  get() {
    this.method = 'GET'
    return this
  }

  post() {
    this.method = 'POST'
    return this
  }

  put() {
    this.method = 'PUT'
    return this
  }

  delete() {
    this.method = 'DELETE'
    return this
  }

  // Header setters

  token(token?: string) {
    if (token) {
      this.headers.Authorization = `Token ${token}`
    }

    return this
  }

  // Body setters

  json(data: object) {
    this.body = JSON.stringify(data)
    this.headers['Content-Type'] = 'application/json'
    return this
  }

  // Other

  sig(signal?: AbortSignal) {
    this.signal = signal
    return this
  }
}
