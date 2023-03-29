import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { TrackApi } from "../../store/services/TrackService";
import Track from "../Track";
import "./top-tracks.scss";

const TopTracks: React.FC = () => {
  const dispatch = useAppDispatch();
  const { playAlbum, setActive } = playerSlice.actions;
  const { active } = useAppSelector((state) => state.player);
  const { data: albumTracks, isLoading } = TrackApi.useGetTracksQuery(5);

  const handlerPlayAlbumTracks = () => {
    dispatch(playAlbum({ id: null, tracks: albumTracks }));
    if (!active.track && albumTracks) {
      dispatch(setActive(albumTracks[0]));
    }
  };

  return (
    <div className="top-tracks">
      <h2 className="top-tracks__title">Top tracks of this month</h2>
      <span className="top-tracks__content">Visible only to you</span>
      <ul className="top-tracks__list">
        {albumTracks &&
          albumTracks.map((track, index) => (
            <Track
              key={track._id}
              active={active.track?._id === track._id}
              number={index + 1}
              handlerPlay={handlerPlayAlbumTracks}
              track={track}
            />
          ))}
      </ul>
    </div>
  );
};

export default React.memo(TopTracks);
