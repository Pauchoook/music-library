import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser, UserState } from '../../../types/user';
import { changeAvatar, check, editUser, login, registration } from './ActionCreators';

const initialState: UserState = {
  user: null,
  isAuth: false,
  error: '',
  isLoading: false
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
      })
      .addCase(changeAvatar.fulfilled.type, (state, action: PayloadAction<string>) => {
        state.user!.avatar = action.payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(changeAvatar.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(changeAvatar.rejected.type, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(editUser.fulfilled.type, (state, action: PayloadAction<IUser>) => {
        state.user= action.payload;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(editUser.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.rejected.type, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  },
});

export default userSlice.reducer;
