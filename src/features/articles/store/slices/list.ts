import type { PayloadAction } from '@reduxjs/toolkit'

import { createCacheSlice } from '@/store/cache-slice'
import type { FetchError } from '@/store/fetch'

export interface ArticlesListParams {
  page: number
  perPage: number
}

const articlesListSlice = createCacheSlice(
  'articlesList',
  undefined as ArticlesListParams | undefined,
  undefined as Model.Articles | undefined,
  undefined as FetchError | undefined,
  {
    extraData: { perPage: 5 },
    reducers: {
      onFavoritesChanged: (
        state,
        action: PayloadAction<{
          slug: string
          favorited: boolean
          favoritesCount: number
        }>,
      ) => {
        state.data?.articles.forEach((article) => {
          if (article.slug === action.payload.slug) {
            article.favorited = action.payload.favorited
            article.favoritesCount = action.payload.favoritesCount
          }
        })
      },
    },
  },
)

export const {
  onLoadingStarted: onListFetchStarted,
  onLoadingError: onListFetchError,
  onLoadingSuccess: onListFetched,
  onReset: onListReset,
  onFavoritesChanged: onListFavoritesChanged,
} = articlesListSlice.actions

export default articlesListSlice.reducer
