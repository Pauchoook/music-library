import { IUser } from "./user";

export interface ITrack {
  _id?: string;
  name: string;
  listens: number;
  picture: string;
  audio: string;
  executor: string;
  createdAt: string;
  user: IUser;
  comments: any[];
}