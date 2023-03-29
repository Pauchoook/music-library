import { createSlice } from "@reduxjs/toolkit";
import { PlayerState } from "../../../types/player";

const initialState: PlayerState = {
  currentAlbum: {
    _id: null,
    tracks: [],
  },
  active: {
    index: -1,
    track: null,
  },
  currentTime: 0,
  duration: 0,
  volume: 50,
  pause: true,
};

export const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    pauseTrack(state) {
      state.pause = true;
    },
    playTrack(state) {
      state.pause = false;
    },
    setCurrentTime(state, action) {
      state.currentTime = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
    setDuration(state, action) {
      state.duration = action.payload;
    },
    setActive(state, action) {
      state.active.track = action.payload;
      state.duration = 0;
      state.currentTime = 0;

      const indexActive = state.currentAlbum.tracks.findIndex((item) => item._id === state.active.track!._id);
      state.active.index = indexActive;
    },
    playAlbum(state, action) {
      state.currentAlbum = action.payload;
      state.pause = false;
    },
  },
});

export default playerSlice.reducer;
