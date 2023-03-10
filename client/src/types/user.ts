export interface IUser {
  _id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  dateBirth: string;
  avatar: string;
}

export interface UserState {
  user: IUser | null;
  isAuth: boolean;
  error: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  username: string;
  dateBirth: string;
  gender: string;
}