import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/user/UserSlice';
import playerReducer from './reducers/player/PlayerSlice';
import { AlbumApi } from './services/AlbumService';
import { TrackApi } from './services/TrackService';

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  [AlbumApi.reducerPath]: AlbumApi.reducer,
  [TrackApi.reducerPath]: TrackApi.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([AlbumApi.middleware, TrackApi.middleware]),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
