import {configureStore} from '@reduxjs/toolkit';
import {teamsApi} from '../services/teams';
import {playersApi} from '../services/players';

export const store = configureStore({
  reducer: {
    [teamsApi.reducerPath]: teamsApi.reducer,
    [playersApi.reducerPath]: playersApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({serializableCheck: false}).concat(
      teamsApi.middleware,
      playersApi.middleware,
    ),
});
