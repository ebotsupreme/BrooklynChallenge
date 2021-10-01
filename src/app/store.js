import {configureStore} from '@reduxjs/toolkit';
import {teamsApi} from '../services/teams';
import {playersApi} from '../services/players';
import {playerImagesApi} from '../services/playerImage';

export const store = configureStore({
  reducer: {
    [teamsApi.reducerPath]: teamsApi.reducer,
    [playersApi.reducerPath]: playersApi.reducer,
    [playerImagesApi.reducerPath]: playerImagesApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      teamsApi.middleware,
      playersApi.middleware,
      playerImagesApi.middleware,
    ),
});
