import { combineReducers } from 'redux'

import singleArticleReducer from './slices/single'
import articlesListReducer from './slices/list'

const articlesReducer = combineReducers({
  single: singleArticleReducer,
  list: articlesListReducer,
})

export default articlesReducer
