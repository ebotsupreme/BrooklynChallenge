import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const playerImagesApi = createApi({
  reducerPath: 'playerImagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/',
  }),
  endpoints: builder => ({
    getPlayersImage: builder.query({
      query: id => `260x190/${id}.png`,
      // query: () => 'wp-content/uploads/headshots/nba/latest/260x190/202322.png',
      // transformResponse: returnValue => {
      //   return [
      //     `https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${id}.png`,
      //   ];
      // },
    }),
  }),
});

export const {useGetPlayersImageQuery} = playerImagesApi;
