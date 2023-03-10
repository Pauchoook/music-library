import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, UserState } from '../../../types/user';
import { check, login, registration } from './ActionCreators';

const initialState: UserState = {
  user: null,
  isAuth: false,
  error: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuth = false;
      state.error = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registration.fulfilled.type, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.error = '';
      })
      .addCase(registration.rejected.type, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
      .addCase(login.fulfilled.type, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.error = '';
      })
      .addCase(login.rejected.type, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      })
      .addCase(check.fulfilled.type, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
        state.isAuth = true;
      });
  },
});

export default userSlice.reducer;
