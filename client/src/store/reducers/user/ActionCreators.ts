import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { FormValuesLogin } from '../../../components/AuthForm/LoginForm';
import jwt_decode from 'jwt-decode';
import { $authHost } from '../../../http';
import { ICreateUser, IUser } from '../../../types/user';

interface IResponseAuth {
  token: string;
}

export const registration = createAsyncThunk('auth/registration', async (user: ICreateUser, thunkAPI) => {
  try {
    const response = await axios.post<IResponseAuth>(`${process.env.REACT_APP_API_URL}/auth/registration`, user);
    document.cookie = `token=${response.data.token}`;
    return jwt_decode(response.data.token);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const login = createAsyncThunk('auth/login', async (user: FormValuesLogin, thunkAPI): Promise<IUser[] | unknown> => {
  try {
    const response = await axios.post<IResponseAuth>(`${process.env.REACT_APP_API_URL}/auth/login`, user);
    document.cookie = `token=${response.data.token}`;
    return jwt_decode(response.data.token);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const check = createAsyncThunk('auth/check', async (_, thunkAPI): Promise<IUser | unknown> => {
  try {
    const response = await $authHost.get<IResponseAuth>(`/auth/check`);
    document.cookie = `token=${response.data.token}`;
    return jwt_decode(response.data.token);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});
