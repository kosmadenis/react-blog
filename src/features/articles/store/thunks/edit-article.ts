import { createAsyncThunk } from '@/store/async'
import { extractError } from '@/store/fetch'

import { resetArticlesList } from './fetch-list'
import { resetSingleArticle } from './fetch-single'

export const { thunk: editArticle } = createAsyncThunk<
  { slug: string; article: Model.BaseArticle },
  Model.Article,
  any
>(
  false,
  async function editArticleThunk(
    signal,
    { dispatch, getState },
    { api },
    { slug, article: data },
  ) {
    const token = getState().user.data?.token

    if (!token) {
      throw new Error('Not logged in')
    }

    const { article } = await api.editArticle(slug, data, token, signal)

    dispatch(resetArticlesList())
    dispatch(resetSingleArticle())

    return article
  },
  (_, error) => extractError(error).contents,
)
