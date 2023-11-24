import type { ThunkFn } from '@/store'
import { resetArticlesList } from '@/features/articles/store/thunks/fetch-list'
import { resetSingleArticle } from '@/features/articles/store/thunks/fetch-single'

import { onLogOut } from '../slices/user'

export const logOut: ThunkFn<void, void> = () => (dispatch) => {
  localStorage.removeItem('user')

  dispatch(resetArticlesList())
  dispatch(resetSingleArticle())

  dispatch(onLogOut())
}
