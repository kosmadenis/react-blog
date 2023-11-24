import { createAsyncThunk } from '@/store/async'
import { extractError } from '@/store/fetch'
import shallowCompare from '@/util/objects/shallow-compare'

import {
  type ArticlesListParams,
  onListFetchStarted,
  onListFetched,
  onListFetchError,
  onListReset,
} from '../slices/list'

export const { thunk: fetchArticlesList, cancel: resetArticlesList } =
  createAsyncThunk<ArticlesListParams, Model.Articles, any>(
    (oldData, newData) => shallowCompare(oldData, newData),
    async function fetchArticlesListThunk(
      signal,
      { dispatch, getState },
      { api },
      data,
    ) {
      dispatch(onListFetchStarted(data))
      const token = getState().user.data?.token
      const offset = (data.page - 1) * data.perPage
      const result = await api.getArticles(data.perPage, offset, token, signal)
      dispatch(onListFetched(result))
      return result
    },
    ({ dispatch }, error) => {
      const { serialized, contents } = extractError(error)
      dispatch(onListFetchError(serialized))
      return contents
    },
    ({ dispatch }) => {
      dispatch(onListReset())
    },
  )
