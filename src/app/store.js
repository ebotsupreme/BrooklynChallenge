import {configureStore} from '@reduxjs/toolkit';
import {teamsApi} from '../services/teams';
import {playersApi} from '../services/players';
import teamReducer from '../features/team/teamSlice';

export const store = configureStore({
  reducer: {
    [teamsApi.reducerPath]: teamsApi.reducer,
    [playersApi.reducerPath]: playersApi.reducer,
    team: teamReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(teamsApi.middleware, playersApi.middleware),
});
