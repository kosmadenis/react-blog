import { createAsyncThunk } from '@/store/async'
import { extractError } from '@/store/fetch'

import { onSingleFavoritesChanged } from '../slices/single'
import { onListFavoritesChanged } from '../slices/list'

export const { thunk: toggleFavorite } = createAsyncThunk<
  { state: boolean; slug: string },
  void,
  any
>(
  'non-unique',
  async function toggleFavoriteThunk(
    signal,
    { dispatch, getState },
    { api },
    { state, slug },
  ) {
    const token = getState().user.data?.token

    if (!token) {
      throw new Error('Not logged in')
    }

    const apiCall = state
      ? api.favoriteArticle(slug, token, signal)
      : api.unfavoriteArticle(slug, token, signal)

    const { article } = await apiCall
    const { favoritesCount, favorited } = article

    dispatch(onSingleFavoritesChanged({ slug, favorited, favoritesCount }))
    dispatch(onListFavoritesChanged({ slug, favorited, favoritesCount }))
  },
  (_, error) => extractError(error).contents,
)
