declare namespace Model {
  // Base article data (editable)
  interface BaseArticle {
    title: string
    description: string
    body: string
    tagList: string[]
  }

  // Full article data (w/ non-editable fields)
  interface Article extends BaseArticle {
    slug: string
    createdAt: string
    updatedAt: string
    favorited: boolean
    favoritesCount: number
    author: User
  }

  // Articles list
  interface Articles {
    articles: Article[]
    articlesCount: number
  }

  // Any user
  interface User {
    username: string
    bio?: string | null
    image: string
    following: boolean
  }

  // Self user data
  interface SelfUser {
    token: string
    email: string
    username: string
    bio?: string
    image?: string
  }

  interface UpdateUserData {
    password?: string
    email?: string
    username?: string
    bio?: string
    image?: string
  }

  interface SignInData {
    email: string
    password: string
  }

  interface SignUpData {
    username: string
    email: string
    password: string
  }
}
