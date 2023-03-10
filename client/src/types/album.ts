import { ITrack } from "./track";
import { IUser } from "./user";

export interface IAlbum {
  _id: string;
  name: string;
  executor: string;
  listens: number;
  likes: number;
  picture: string;
  createdAt: string;
  updatedAt: string;
  owner: IUser;
  tracks: ITrack[];
}

export interface ICreateTrack {
  name: string;
  executor: string;
  owner: string;
  picture: File
}