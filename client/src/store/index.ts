import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './reducers/user/UserSlice';
import playerReducer from './reducers/player/PlayerSlice';
import { AlbumApi } from "./services/AlbumService";

const rootReducer = combineReducers({
  user: userReducer,
  player: playerReducer,
  [AlbumApi.reducerPath]: AlbumApi.reducer
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(AlbumApi.middleware)
  })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];