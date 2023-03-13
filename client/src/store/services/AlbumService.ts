
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { IAlbum, ICreateAlbum } from '../../types/album';

export const AlbumApi = createApi({
  reducerPath: 'albumApi',
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_API_URL}),
  tagTypes: ['Albums'],
  endpoints: (build) => ({
    getAlbums: build.query<IAlbum[], {limit: number, dateSort: string}>({
      query: ({limit, dateSort}) => ({
        url: `/album?limit=${limit}&dateSort=${dateSort}`
      }),
      providesTags: res => ['Albums']
    }),
    getAlbumsOwner: build.query<IAlbum[], {owner_id: string, limit: number}>({
      query: ({owner_id, limit}) => ({
        url: `/album?owner_id=${owner_id}&limit=${limit}`,
      }),
      providesTags: res => ['Albums']
    }),
    createAlbum: build.mutation<IAlbum[], FormData>({
      query: (album) => ({
        url: '/album',
        method: 'POST',
        body: album
      }),
      invalidatesTags: ['Albums']
    })
  })
});