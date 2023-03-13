export interface IUser {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
  dateBirth: string;
  avatar: string;
}

export interface UserState {
  user: IUser | null;
  isAuth: boolean;
  error: string;
  isLoading: boolean;
}

export interface ICreateUser {
  email: string;
  password: string;
  username: string;
  dateBirth: string;
  gender: string;
}

export interface FormValuesChangeAvatar {
  avatar: File[];
}

export interface FormValuesEditUser {
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  gender: string;
}
