import type { PayloadAction } from '@reduxjs/toolkit'

import { createCacheSlice } from '@/store/cache-slice'
import type { FetchError } from '@/store/fetch'

const singleArticleSlice = createCacheSlice(
  'singleArticle',
  undefined as string | undefined,
  undefined as Model.Article | undefined,
  undefined as FetchError | undefined,
  {
    reducers: {
      onFavoritesChanged: (
        state,
        action: PayloadAction<{
          slug: string
          favorited: boolean
          favoritesCount: number
        }>,
      ) => {
        if (state.data && state.data.slug === action.payload.slug) {
          state.data.favorited = action.payload.favorited
          state.data.favoritesCount = action.payload.favoritesCount
        }
      },
    },
  },
)

export const {
  onLoadingStarted: onSingleFetchStarted,
  onLoadingError: onSingleFetchError,
  onLoadingSuccess: onSingleFetched,
  onReset: onSingleReset,
  onFavoritesChanged: onSingleFavoritesChanged,
} = singleArticleSlice.actions

export default singleArticleSlice.reducer
