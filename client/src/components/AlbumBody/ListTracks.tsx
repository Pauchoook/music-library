import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { IAlbum } from "../../types/album";
import Track from "../Track";

interface ListTrackProps {
  album: IAlbum | undefined;
  handlerPlay: () => void;
}

const ListTracks: React.FC<ListTrackProps> = ({ album, handlerPlay }) => {
  const {active} = useAppSelector(state => state.player);

  return (
    <>
      {album?.tracks.map((track, index) => (
        <Track key={track._id} handlerPlay={handlerPlay} track={track} number={index + 1} active={active.track?._id === track?._id}/>
      ))}
    </>
  );
};

export default ListTracks;
