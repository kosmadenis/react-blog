import {
  createSlice,
  type Draft,
  type PayloadAction,
  type SliceCaseReducers,
  type ValidateSliceCaseReducers,
} from '@reduxjs/toolkit'

export interface CacheSliceData<Input, Output, Error> {
  loading: boolean
  params?: Input
  data?: Output
  error?: Error
}

export interface CreateCacheSliceParams<
  Input,
  Output,
  Error,
  Extra,
  CR extends SliceCaseReducers<CacheSliceData<Input, Output, Error> & Extra>,
> {
  extraData?: Extra
  onStart?: (
    state: Draft<CacheSliceData<Input, Output, Error>>,
    value: Input,
  ) => void
  onError?: (
    state: Draft<CacheSliceData<Input, Output, Error>>,
    value: Error,
  ) => void
  onSuccess?: (
    state: Draft<CacheSliceData<Input, Output, Error>>,
    value: Output,
  ) => void
  onReset?: (state: Draft<CacheSliceData<Input, Output, Error>>) => void
  reducers?: ValidateSliceCaseReducers<
    CacheSliceData<Input, Output, Error> & Extra,
    CR
  >
}

export function createCacheSlice<
  Input,
  Output,
  Error,
  Extra extends object,
  CR extends SliceCaseReducers<CacheSliceData<Input, Output, Error> & Extra>,
>(
  name: string,
  initialParams: Input | undefined,
  initialData: Output | undefined,
  iniitialError: Error | undefined,
  {
    extraData,
    onStart,
    onError,
    onSuccess,
    onReset: onResetExtra,
    reducers,
  }: CreateCacheSliceParams<Input, Output, Error, Extra, CR> = {},
) {
  type State = CacheSliceData<Input, Output, Error> & Extra

  const initialState = {
    loading: false,
    params: initialParams,
    data: initialData,
    error: iniitialError,
    ...extraData!,
  } as State

  const baseReducers = {
    onLoadingStarted: (state: Draft<State>, action: PayloadAction<Input>) => {
      state.loading = true
      state.params = action.payload as Draft<Input>
      // keep cached data, if any
      // keep cached error, if any

      if (onStart) onStart(state, action.payload)
    },
    onLoadingError: (state: Draft<State>, action: PayloadAction<Error>) => {
      state.loading = false
      // keep cached params (will always exist at this point)
      // keep cached data, if any
      state.error = action.payload as Draft<Error>

      if (onError) onError(state, action.payload)
    },
    onLoadingSuccess: (state: Draft<State>, action: PayloadAction<Output>) => {
      state.loading = false
      // keep cached params (will always exist at this point)
      state.data = action.payload as Draft<Output>
      delete state.error

      if (onSuccess) onSuccess(state, action.payload)
    },
    onReset: (state: Draft<State>) => {
      state.loading = false
      delete state.params
      delete state.data
      delete state.error

      if (onResetExtra) onResetExtra(state)
    },
  }

  return createSlice({
    name,
    initialState,
    reducers: {
      ...baseReducers,
      ...reducers!,
    },
  })
}
