import { createAsyncThunk } from '@/store/async'
import shallowCompare from '@/util/objects/shallow-compare'
import { extractError } from '@/store/fetch'
import { resetArticlesList } from '@/features/articles/store/thunks/fetch-list'
import { resetSingleArticle } from '@/features/articles/store/thunks/fetch-single'

import { onProfileUpdated } from '../slices/user'

export const { thunk: editProfile } = createAsyncThunk<
  Model.UpdateUserData,
  void,
  any
>(
  (oldData, newData) => !shallowCompare(oldData, newData),
  async function editProfileThunk(
    signal,
    { dispatch, getState },
    { api },
    data,
  ) {
    const token = getState().user.data?.token

    if (!token) {
      throw new Error('Not logged in')
    }

    const { user } = await api.updateUser(data, token, signal)

    localStorage.setItem('user', JSON.stringify(user))

    dispatch(resetArticlesList())
    dispatch(resetSingleArticle())

    dispatch(onProfileUpdated(user))
  },
  (_, error) => extractError(error).contents,
)
