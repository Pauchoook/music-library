import { stringify } from "querystring";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { AlbumApi } from "../../store/services/AlbumService";
import { IAlbum } from "../../types/album";
import { ITrack } from "../../types/track";
import AlbumBodyHeader from "./AlbumBodyHeader";
import ListTracks from "./ListTracks";

interface AlbumBodyProps {
  album: IAlbum | undefined;
}

interface RecentlyAlbum {
  _id: string;
  name: string;
  picture: string;
  ownerUsername: string;
}

const AlbumBody: React.FC<AlbumBodyProps> = ({ album }) => {
  const dispatch = useAppDispatch();
  const { playAlbum, setActive } = playerSlice.actions;
  const { active, currentAlbum } = useAppSelector((state) => state.player);
  const [tracks, setTracks] = useState<ITrack[]>(album?.tracks || []); // нужен для реализации поиска по трекам
  const [listenAlbum, {}] = AlbumApi.useListenAlbumMutation();

  const handlerPlayAlbum = () => {
    dispatch(playAlbum({ _id: album?._id, tracks: album?.tracks }));
    if (!active.track || currentAlbum._id !== album?._id) {
      // если активного трека нет или же он не принадлежит текущему альбому, включаем первый в альбоме
      dispatch(setActive(album?.tracks[0]));
    }

    listenAlbum(album!._id);

    // добавляем альбом в недавно прослушанные
    const recentlyPlayedAlbum: RecentlyAlbum = {
      _id: album!._id,
      name: album!.name,
      picture: album!.picture,
      ownerUsername: album!.owner.username,
    };
    const recentlyPlayedAlbums = localStorage.getItem("recently-played");

    if (recentlyPlayedAlbums) {
      const currentRecentlyPlayedAlbums: RecentlyAlbum[] = JSON.parse(recentlyPlayedAlbums);
      const addedAlbum = currentRecentlyPlayedAlbums.find((item) => item._id === album?._id);

      if (!addedAlbum) {
        // если альбом отстутствует в недавно прослушанных, только в таком случае добавляем
        currentRecentlyPlayedAlbums.unshift(recentlyPlayedAlbum);

        if (currentRecentlyPlayedAlbums.length > 10) {
          // делаем лимит в последних прослушанных альбомах
          currentRecentlyPlayedAlbums.pop();
        }

        localStorage.setItem("recently-played", JSON.stringify(currentRecentlyPlayedAlbums));
      }
    } else {
      localStorage.setItem("recently-played", JSON.stringify([recentlyPlayedAlbum]));
    }
  };

  React.useEffect(() => {
    if (album) {
      setTracks(album.tracks);
    }
  }, [album]);

  const handlerSerachTracks = (value: string) => {
    if (album) {
      const findTracks = album.tracks.filter((item) => item.name.includes(value));
      setTracks(findTracks);
    }
  };

  return (
    <div className="album-body">
      <AlbumBodyHeader handlerSerachTracks={handlerSerachTracks} handlerPlay={handlerPlayAlbum} album={album} />
      <ListTracks handlerPlay={handlerPlayAlbum} tracks={tracks} />
    </div>
  );
};

export default AlbumBody;
