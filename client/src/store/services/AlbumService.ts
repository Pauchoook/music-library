import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAlbum } from "../../types/album";

export const AlbumApi = createApi({
  reducerPath: "albumApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/album` }),
  tagTypes: ["MyAlbums"],
  endpoints: (build) => ({
    getAlbums: build.query<IAlbum[], { limit: number; dateSort: string }>({
      query: ({ limit, dateSort }) => ({
        url: `?limit=${limit}&dateSort=${dateSort}`,
      }),
    }),
    getAlbumsOwner: build.query<IAlbum[], { owner_id: string; limit?: number }>({
      query: ({ owner_id, limit }) => ({
        url: `?owner_id=${owner_id}&limit=${limit || ""}`,
      }),
      providesTags: (res) => ["MyAlbums"],
    }),
    getAlbumOne: build.query<IAlbum, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
      }),
    }),
    createAlbum: build.mutation<IAlbum[], FormData>({
      query: (album) => ({
        url: "",
        method: "POST",
        body: album,
      }),
      invalidatesTags: ["MyAlbums"],
    }),
    addTrack: build.mutation<IAlbum, { id: string; trackId: string }>({
      query: (body) => ({
        url: "/addTrack",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyAlbums"],
    }),
    removeTrack: build.mutation<IAlbum, { id: string; trackId: string }>({
      query: (body) => ({
        url: "/removeTrack",
        method: "POST",
        body,
      }),
      invalidatesTags: ["MyAlbums"],
    }),
    listenAlbum: build.mutation<undefined, string>({
      query: (id) => ({
        url: `/listen/${id}`,
        method: "PUT",
      }),
    }),
  }),
});
