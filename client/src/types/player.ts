import { ITrack } from "./track";

export interface PlayerState {
  active: null | ITrack;
  currentTime: number;
  duration: number;
  volume: number;
  pause: boolean;
}