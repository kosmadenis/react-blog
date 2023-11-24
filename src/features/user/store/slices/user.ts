import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface AuthData {
  data: Model.SelfUser | null
}

const initialState: AuthData = {
  data: JSON.parse(localStorage.getItem('user') ?? 'null'),
}

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    onLogIn: (state, action: PayloadAction<Model.SelfUser>) => {
      state.data = action.payload
    },
    onLogOut: (state) => {
      state.data = null
    },
    onAccountCreated: (state, action: PayloadAction<Model.SelfUser>) => {
      state.data = action.payload
    },
    onProfileUpdated: (state, action: PayloadAction<Model.SelfUser>) => {
      state.data = action.payload
    },
  },
})

export const { onLogIn, onLogOut, onAccountCreated, onProfileUpdated } =
  authSlice.actions

export default authSlice.reducer
