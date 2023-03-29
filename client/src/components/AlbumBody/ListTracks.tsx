import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { IAlbum } from "../../types/album";
import { ITrack } from "../../types/track";
import Track from "../Track";

interface ListTrackProps {
  tracks: ITrack[];
  handlerPlay: () => void;
}

const ListTracks: React.FC<ListTrackProps> = ({ tracks, handlerPlay }) => {
  const { active } = useAppSelector((state) => state.player);

  return (
    <>
      {tracks.length ? (
        tracks.map((track, index) => (
          <Track
            key={track._id}
            handlerPlay={handlerPlay}
            track={track}
            number={index + 1}
            active={active.track?._id === track?._id}
          />
        ))
      ) : (
        <h4 className="album-body__empty">The album is empty</h4>
      )}
    </>
  );
};

export default ListTracks;
