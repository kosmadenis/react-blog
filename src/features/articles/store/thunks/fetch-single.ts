import { createAsyncThunk } from '@/store/async'
import { extractError } from '@/store/fetch'

import {
  onSingleFetched,
  onSingleFetchError,
  onSingleFetchStarted,
  onSingleReset,
} from '../slices/single'

export const { thunk: fetchSingleArticle, cancel: resetSingleArticle } =
  createAsyncThunk<string, Model.Article, any>(
    (oldSlug, newSlug) => oldSlug !== newSlug,
    async function fetchSingleArticleThunk(
      signal,
      { dispatch, getState },
      { api },
      slug,
    ) {
      dispatch(onSingleFetchStarted(slug))
      const token = getState().user.data?.token
      const { article } = await api.getArticle(slug, token, signal)
      dispatch(onSingleFetched(article))
      return article
    },
    ({ dispatch }, error) => {
      const { serialized, contents } = extractError(error)
      dispatch(onSingleFetchError(serialized))
      return contents
    },
    ({ dispatch }) => {
      dispatch(onSingleReset())
    },
  )
