import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { IAlbum } from "../../types/album";
import AlbumBodyHeader from "./AlbumBodyHeader";
import ListTracks from "./ListTracks";

interface AlbumBodyProps {
  album: IAlbum | undefined;
}

const AlbumBody: React.FC<AlbumBodyProps> = ({ album }) => {
  const dispatch = useAppDispatch();
  const { playAlbum, setActive } = playerSlice.actions;
  const { active, currentAlbum } = useAppSelector((state) => state.player);

  const handlerPlayAlbum = () => {
    dispatch(playAlbum({ _id: album?._id, tracks: album?.tracks }));
    if (!active.track || currentAlbum._id !== album?._id) {
      // если активного трека нет или же он не принадлежит текущему альбому, включаем первый в альбоме
      dispatch(setActive(album?.tracks[0]));
    }
  };

  return (
    <div className="album-body">
      <AlbumBodyHeader handlerPlay={handlerPlayAlbum} album={album} />
      <ListTracks handlerPlay={handlerPlayAlbum} album={album} />
    </div>
  );
};

export default React.memo(AlbumBody);
