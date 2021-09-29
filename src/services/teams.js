import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const teamsApi = createApi({
  reducerPath: 'teamsApi',
  baseQuery: fetchBaseQuery({baseUrl: 'http://data.nba.net/10s/prod/v1/2021/'}),
  endpoints: builder => ({
    getAllTeams: builder.query({
      query: () => 'teams.json',
    }),
  }),
});

export const {useGetAllTeamsQuery} = teamsApi;
