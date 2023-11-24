import FetchParams from '@/util/api/fetch-params'
import { expectCode } from '@/util/api/http-code-error'

export default class BlogApiClient {
  #baseURL: URL

  constructor(baseURL: string) {
    this.#baseURL = new URL(baseURL)
  }

  #createUrl(path: string) {
    const url = new URL(this.#baseURL)

    const basePath = url.pathname.replace(/\/+$/, '')
    const addedPath = path.replace(/^\/+/, '')

    url.pathname = `${basePath}/${addedPath}`

    return url
  }

  // Articles

  async getArticles(
    limit: number,
    offset: number,
    token?: string,
    signal?: AbortSignal,
  ) {
    const url = this.#createUrl('/articles')
    url.searchParams.set('limit', limit.toString())
    url.searchParams.set('offset', offset.toString())
    const params = new FetchParams().sig(signal).get().token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as Model.Articles
  }

  async getArticle(slug: string, token?: string, signal?: AbortSignal) {
    const url = this.#createUrl(`/articles/${slug}`)
    const params = new FetchParams().sig(signal).get().token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { article: Model.Article }
  }

  async createArticle(
    data: Model.BaseArticle,
    token: string,
    signal?: AbortSignal,
  ) {
    const url = this.#createUrl('/articles')
    const params = new FetchParams()
      .sig(signal)
      .post()
      .json({ article: data })
      .token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { article: Model.Article }
  }

  async editArticle(
    slug: string,
    data: Model.BaseArticle,
    token: string,
    signal?: AbortSignal,
  ) {
    const url = this.#createUrl(`/articles/${slug}`)
    const params = new FetchParams()
      .sig(signal)
      .put()
      .json({ article: data })
      .token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { article: Model.Article }
  }

  async deleteArticle(slug: string, token: string, signal?: AbortSignal) {
    const url = this.#createUrl(`/articles/${slug}`)
    const params = new FetchParams().sig(signal).delete().token(token)
    const response = await fetch(url, params)
    await expectCode(response)
  }

  async favoriteArticle(slug: string, token: string, signal?: AbortSignal) {
    const url = this.#createUrl(`/articles/${slug}/favorite`)
    const params = new FetchParams().sig(signal).post().token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { article: Model.Article }
  }

  async unfavoriteArticle(slug: string, token: string, signal?: AbortSignal) {
    const url = this.#createUrl(`/articles/${slug}/favorite`)
    const params = new FetchParams().sig(signal).delete().token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { article: Model.Article }
  }

  // User

  async getUser(token: string, signal?: AbortSignal) {
    const url = this.#createUrl('/user')
    const params = new FetchParams().sig(signal).get().token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { user: Model.SelfUser }
  }

  async updateUser(
    data: Model.UpdateUserData,
    token: string,
    signal?: AbortSignal,
  ) {
    const url = this.#createUrl('/user')
    const params = new FetchParams()
      .sig(signal)
      .put()
      .json({ user: data })
      .token(token)
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { user: Model.SelfUser }
  }

  // Auth

  async signIn(data: Model.SignInData, signal?: AbortSignal) {
    const url = this.#createUrl('/users/login')
    const params = new FetchParams().sig(signal).post().json({ user: data })
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { user: Model.SelfUser }
  }

  async signUp(data: Model.SignUpData, signal?: AbortSignal) {
    const url = this.#createUrl('/users')
    const params = new FetchParams().sig(signal).post().json({ user: data })
    const response = await fetch(url, params)
    await expectCode(response)
    const result = await response.json()
    return result as { user: Model.SelfUser }
  }
}
