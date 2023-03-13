
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ITrack, FormValuesTrack } from '../../types/track';

export const TrackApi = createApi({
  reducerPath: 'trackApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
  // tagTypes: ['Tracks'],
  endpoints: (build) => ({
    getTracks: build.query<ITrack[], number>({
      query: (count) => ({
        url: `/track?count=${count}`
      }),
      // providesTags: res => ['Tracks']
    }),
    createTrack: build.mutation<ITrack, FormData>({
      query: (track) => ({
        url: '/track',
        method: 'POST',
        body: track
      }),
      // invalidatesTags: ['Tracks']
    })
  })
});