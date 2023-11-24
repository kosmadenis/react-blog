import { isAbortError } from '@/util/errors'

import type { AppDispatch, RootState, ThunkArg, ThunkArgWithInternals } from '.'

export interface AsyncThunkStoreAPI {
  dispatch: AppDispatch
  getState: () => RootState
}

export interface AsyncThunkMetadata<Input, Output, Error> {
  data: Input
  promise: Promise<AsyncThunkResult<Output, Error>>
  controller: AbortController
}

export type AsyncThunkResult<Output, Error> =
  | { status: 'ok'; value: Output }
  | { status: 'cancel'; next?: Promise<AsyncThunkResult<Output, Error>> }
  | { status: 'error'; error: Error }

export interface AsyncThunkRun<Input, Output> {
  (
    signal: AbortSignal | undefined,
    storeAPI: AsyncThunkStoreAPI,
    arg: ThunkArg,
    data: Input,
  ): Promise<Output>
}

export interface AsyncThunkErrorHandler<Error> {
  (storeAPI: AsyncThunkStoreAPI, error: unknown): Error
}

export interface AsyncThunkCancelHandler {
  (storeAPI: AsyncThunkStoreAPI, arg: ThunkArg): void
}

export type AsyncThunk<Input, Output, Error> = (
  data: Input,
) => (
  dispatch: AppDispatch,
  getState: () => RootState,
  thunkArg: ThunkArgWithInternals,
) => Promise<AsyncThunkResult<Output, Error>>

export type AsyncThunkCancel = () => (
  dispatch: AppDispatch,
  getState: () => RootState,
  thunkArg: ThunkArgWithInternals,
) => void

export interface CreateAsyncThunkReturn<Input, Output, Error> {
  thunk: AsyncThunk<Input, Output, Error>
  cancel: AsyncThunkCancel
}

export function createAsyncThunk<Input, Output, Error>(
  cancelOngoing:
    | 'non-unique'
    | boolean
    | ((oldData: Input, newData: Input, getState: () => RootState) => boolean),
  run: AsyncThunkRun<Input, Output>,
  onError: AsyncThunkErrorHandler<Error>,
  onCancel?: AsyncThunkCancelHandler,
): CreateAsyncThunkReturn<Input, Output, Error> {
  if (cancelOngoing === 'non-unique') {
    const cancel: AsyncThunkCancel = () => (dispatch, getState, thunkArg) =>
      onCancel && onCancel({ dispatch, getState }, thunkArg)

    const thunk: AsyncThunk<Input, Output, Error> =
      (data) => (dispatch, getState, thunkArg) =>
        run(undefined, { dispatch, getState }, thunkArg, data).then(
          (value) =>
            ({ status: 'ok', value }) as AsyncThunkResult<Output, Error>,
          (error) =>
            ({
              status: 'error',
              error: onError({ dispatch, getState }, error),
            }) as AsyncThunkResult<Output, Error>,
        )

    return { thunk, cancel }
  }

  const id = Symbol(`createAsyncThunk:${run.name}`)

  interface Arg extends ThunkArgWithInternals {
    asyncThunkMetadata: { [id]?: AsyncThunkMetadata<Input, Output, Error> }
  }

  const cancel: AsyncThunkCancel = () => (dispatch, getState, thunkArg) => {
    const { asyncThunkMetadata, ...strippedThunkArg } = thunkArg
    const metadata = asyncThunkMetadata[id]
    metadata?.controller.abort()
    if (onCancel) onCancel({ dispatch, getState }, strippedThunkArg)
  }

  const thunk: AsyncThunk<Input, Output, Error> =
    (data) => (dispatch, getState, thunkArg: Arg) => {
      const { asyncThunkMetadata, ...strippedThunkArg } = thunkArg
      const metadata = asyncThunkMetadata[id]

      if (metadata) {
        const cancel =
          typeof cancelOngoing === 'function'
            ? cancelOngoing(metadata.data, data, getState)
            : cancelOngoing

        if (cancel) {
          metadata.controller.abort()
          delete asyncThunkMetadata[id]
        } else {
          return metadata.promise
        }
      }

      const storeApi = { dispatch, getState }

      const controller = new AbortController()
      const { signal } = controller
      const promise = run(signal, storeApi, strippedThunkArg, data).then(
        (value) => {
          let result: AsyncThunkResult<Output, Error>

          if (signal.aborted) {
            // Don't remove metadata here
            // (see comment in then's error branch)
            result = {
              status: 'cancel',
              next: asyncThunkMetadata[id]?.promise,
            }
          } else {
            delete asyncThunkMetadata[id]
            result = {
              status: 'ok',
              value,
            }
          }

          return result
        },
        (error) => {
          let result: AsyncThunkResult<Output, Error>

          if (signal.aborted || isAbortError(error)) {
            // Don't remove metadata here - at this point,
            // another thunk operation might be taking place.
            result = {
              status: 'cancel',
              next: asyncThunkMetadata[id]?.promise,
            }
          } else {
            delete asyncThunkMetadata[id]
            result = {
              status: 'error',
              error: onError(storeApi, error),
            }
          }

          return result
        },
      )

      asyncThunkMetadata[id] = { data, controller, promise }

      return promise
    }

  return { thunk, cancel }
}
