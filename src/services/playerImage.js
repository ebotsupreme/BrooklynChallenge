import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const playerImageApi = createApi({
  reducerPath: 'playerImageApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/',
  }),
  endpoints: builder => ({
    getPlayerImage: builder.query({
      query: personId => `260x190/${personId}.png`,
    }),
  }),
});

export const {useGetPlayerImageQuery} = playerImageApi;
