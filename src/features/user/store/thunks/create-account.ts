import { createAsyncThunk } from '@/store/async'
import shallowCompare from '@/util/objects/shallow-compare'
import { extractError } from '@/store/fetch'
import { resetArticlesList } from '@/features/articles/store/thunks/fetch-list'
import { resetSingleArticle } from '@/features/articles/store/thunks/fetch-single'

import { onAccountCreated } from '../slices/user'

export const { thunk: createAccount } = createAsyncThunk<
  Model.SignUpData,
  void,
  any
>(
  (oldData, newData) => !shallowCompare(oldData, newData),
  async function createAccountThunk(
    signal,
    { dispatch },
    { api },
    { username, email, password },
  ) {
    const { user } = await api.signUp({ username, email, password }, signal)

    localStorage.setItem('user', JSON.stringify(user))

    dispatch(resetArticlesList())
    dispatch(resetSingleArticle())

    dispatch(onAccountCreated(user))
  },
  (_, error) => extractError(error).contents,
)
