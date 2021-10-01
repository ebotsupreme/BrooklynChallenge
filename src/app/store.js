import {configureStore} from '@reduxjs/toolkit';
import {teamsApi} from '../services/teams';
import {playersApi} from '../services/players';
// import {playerImagesApi} from '../services/playerImage';
import teamReducer from '../features/team/teamSlice';

export const store = configureStore({
  reducer: {
    [teamsApi.reducerPath]: teamsApi.reducer,
    [playersApi.reducerPath]: playersApi.reducer,
    // [playerImagesApi.reducerPath]: playerImagesApi.reducer,
    team: teamReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(
      teamsApi.middleware,
      playersApi.middleware,
      // playerImagesApi.middleware,
    ),
});