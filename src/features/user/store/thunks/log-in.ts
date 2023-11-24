import { createAsyncThunk } from '@/store/async'
import shallowCompare from '@/util/objects/shallow-compare'
import { extractError } from '@/store/fetch'
import { resetSingleArticle } from '@/features/articles/store/thunks/fetch-single'
import { resetArticlesList } from '@/features/articles/store/thunks/fetch-list'

import { onLogIn } from '../slices/user'

export const { thunk: logIn } = createAsyncThunk<Model.SignInData, void, any>(
  (oldData, newData) => !shallowCompare(oldData, newData),
  async function logInThunk(
    signal,
    { dispatch },
    { api },
    { email, password },
  ) {
    const { user } = await api.signIn({ email, password }, signal)

    localStorage.setItem('user', JSON.stringify(user))

    dispatch(resetArticlesList())
    dispatch(resetSingleArticle())

    dispatch(onLogIn(user))
  },
  (_, error) => extractError(error).contents,
)
