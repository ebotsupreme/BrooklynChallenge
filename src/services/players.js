import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const playersApi = createApi({
  reducerPath: 'playersApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://data.nba.net/10s/prod/v1/2021/'}),
  endpoints: builder => ({
    getAllPlayers: builder.query({
      query: () => 'players.json',
    }),
  }),
});

export const {useGetAllPlayersQuery} = playersApi;
