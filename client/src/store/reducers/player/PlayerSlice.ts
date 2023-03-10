import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../../../types/track';

interface PlayerState {
  active: null | ITrack;
  currentTime: number;
  duration: number;
  volume: number;
  pause: boolean;
}

const initialState: PlayerState = {
  active: null,
  currentTime: 0,
  duration: 0,
  volume: 50,
  pause: true
};

export const playerSlice = createSlice({
  name: 'player',
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
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    }
  }
});

export default playerSlice.reducer;
