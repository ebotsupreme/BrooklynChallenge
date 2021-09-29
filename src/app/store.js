import {configureStore} from '@reduxjs/toolkit';
import {teamsApi} from '../services/teams';

export const store = configureStore({
  reducer: {
    [teamsApi.reducerPath]: teamsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(teamsApi.middleware),
});
