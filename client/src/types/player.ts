import { IAlbum } from "./album";
import { ITrack } from "./track";

export interface PlayerState {
  currentAlbum: {
    _id: string | null,
    tracks: ITrack[]
  };
  active: {
    index: number;
    track: null | ITrack;
  };
  currentTime: number;
  duration: number;
  volume: number;
  pause: boolean;
}
