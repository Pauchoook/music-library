import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITrack, FormValuesTrack } from "../../types/track";

export const TrackApi = createApi({
  reducerPath: "trackApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}/track` }),
  // tagTypes: ['Tracks'],
  endpoints: (build) => ({
    getTracks: build.query<ITrack[], number>({
      query: (count) => ({
        url: `?count=${count}`,
      }),
      // providesTags: res => ['Tracks']
    }),
    createTrack: build.mutation<ITrack, FormData>({
      query: (track) => ({
        url: "",
        method: "POST",
        body: track,
      }),
    }),
    listenTrack: build.mutation<undefined, string>({
      query: (id) => ({
        url: `/listen/${id}`,
        method: "PUT"
      }),
    }),
  }),
});
