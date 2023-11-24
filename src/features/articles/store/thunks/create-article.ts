import { createAsyncThunk } from '@/store/async'
import { extractError } from '@/store/fetch'

import { resetArticlesList } from './fetch-list'

export const { thunk: createArticle } = createAsyncThunk<
  Model.BaseArticle,
  Model.Article,
  any
>(
  false,
  async function createArticleThunk(
    signal,
    { dispatch, getState },
    { api },
    data,
  ) {
    const token = getState().user.data?.token

    if (!token) {
      throw new Error('Not logged in')
    }

    const { article } = await api.createArticle(data, token, signal)

    dispatch(resetArticlesList())

    return article
  },
  (_, error) => extractError(error).contents,
)
