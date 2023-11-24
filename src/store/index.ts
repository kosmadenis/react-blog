import { combineReducers } from 'redux'
import { configureStore } from '@reduxjs/toolkit'

import type BlogApiClient from '@/services/blog-api'
import userReducer from '@/features/user/store'
import articlesReducer from '@/features/articles/store'

import type { AsyncThunkMetadata } from './async'

// Main application reducer

const rootReducer = combineReducers({
  user: userReducer,
  articles: articlesReducer,
})

// Typed configureStore wrapper with a static thunk argument

export function createStore(thunkArg: ThunkArg) {
  const arg: ThunkArgWithInternals = { ...thunkArg, asyncThunkMetadata: {} }

  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: arg,
        },
      }),
  })
}

// Store types

export type RootState = ReturnType<typeof rootReducer>

export type AppDispatch = ReturnType<typeof createStore>['dispatch']

// Thunks

export interface ThunkArg {
  api: BlogApiClient
}

export interface ThunkArgWithInternals extends ThunkArg {
  asyncThunkMetadata: {
    [key: symbol]: AsyncThunkMetadata<unknown, unknown, unknown>
  }
}

export type ThunkFn<Data, Return> = (
  data: Data,
) => (dispatch: AppDispatch, getState: () => RootState, arg: ThunkArg) => Return
