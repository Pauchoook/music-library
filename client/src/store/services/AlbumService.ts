import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IAlbum, ICreateTrack } from '../../types/album';

export const AlbumApi = createApi({
  reducerPath: 'albumApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
  endpoints: (build) => ({
    getAlbums: build.query<IAlbum[], string>({
      query: () => ({
        url: 'album'
      })
    }),
    createAlbum: build.mutation<ICreateTrack, FormData>({
      query: (album) => ({
        url: '/album',
        method: 'POST',
        body: album
      })
    }),
  })
})