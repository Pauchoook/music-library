import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FormValuesLogin } from "../../../components/AuthForm/LoginForm";
import jwt_decode from "jwt-decode";
import { $authHost } from "../../../http";
import { FormValuesEditUser, ICreateUser, IUser } from "../../../types/user";

interface IResponseAuth {
  token: string;
}

interface IUpdateUser extends FormValuesEditUser {
  _id: string;
  dateBirth: string;
}


function setCookie(name: string, value: string, options: any ) {
  options = {
    path: "/",
    "max-age": 24*60*60*1000,
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (let optionKey in options) {
    updatedCookie += "; " + optionKey;
    let optionValue = options[optionKey];
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  }

  document.cookie = updatedCookie;
}

export const registration = createAsyncThunk("auth/registration", async (user: ICreateUser, thunkAPI) => {
  try {
    const response = await axios.post<IResponseAuth>(`${process.env.REACT_APP_API_URL}/auth/registration`, user);
    setCookie("token", response.data.token, {});
    return jwt_decode(response.data.token);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const login = createAsyncThunk(
  "auth/login",
  async (user: FormValuesLogin, thunkAPI): Promise<IUser[] | unknown> => {
    try {
      const response = await axios.post<IResponseAuth>(`${process.env.REACT_APP_API_URL}/auth/login`, user);
      setCookie("token", response.data.token, {});
      return jwt_decode(response.data.token);
    } catch (e: any) {
      return thunkAPI.rejectWithValue(e.response.data.message);
    }
  },
);

export const changeAvatar = createAsyncThunk(
  "user/avatar",
  async (data: FormData, thunkAPI): Promise<string | unknown> => {
    try {
      const response = await axios.put<string>(`${process.env.REACT_APP_API_URL}/user/avatar`, data);
      return response.data;
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Произошла непредвиденная ошибка");
    }
  },
);

export const check = createAsyncThunk("auth/check", async (_, thunkAPI): Promise<IUser | unknown> => {
  try {
    const response = await $authHost.get<IResponseAuth>(`/auth/check`);
    setCookie("token", response.data.token, {});
    return jwt_decode(response.data.token);
  } catch (e: any) {
    return thunkAPI.rejectWithValue(e.response.data.message);
  }
});

export const editUser = createAsyncThunk(
  "user/edit",
  async (newUser: IUpdateUser, thunkAPI): Promise<IUser | unknown> => {
    try {
      const response = await axios.put<IResponseAuth>(`${process.env.REACT_APP_API_URL}/user/${newUser._id}`, newUser);
      document.cookie = `token=${response.data.token}`;
      return jwt_decode(response.data.token);
    } catch (e: any) {
      return thunkAPI.rejectWithValue("Произошла непредвиденная ошибка");
    }
  },
);
