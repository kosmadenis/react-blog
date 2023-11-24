import { createAsyncThunk } from '@/store/async'
import { extractError } from '@/store/fetch'

import { resetArticlesList } from './fetch-list'

export const { thunk: deleteArticle } = createAsyncThunk<string, void, any>(
  false,
  async function deleteArticleThunk(
    signal,
    { dispatch, getState },
    { api },
    slug,
  ) {
    const token = getState().user.data?.token

    if (!token) {
      throw new Error('Not logged in')
    }

    await api.deleteArticle(slug, token, signal)

    dispatch(resetArticlesList())
  },
  (_, error) => extractError(error).contents,
)
