import React from "react";
import { useAppSelector } from "../../hooks/redux";
import { AlbumApi } from "../../store/services/AlbumService";
import { ITrack } from "../../types/track";

interface MyAlbumsProps {
  track: ITrack;
}

const MyAlbums: React.FC<MyAlbumsProps> = ({track}) => {
  const [addTarck, {}] = AlbumApi.useAddTrackMutation();
  const [removeTrack, {}] = AlbumApi.useRemoveTrackMutation();
  const { user } = useAppSelector((state) => state.user);
  const { data: myAlbums } = AlbumApi.useGetAlbumsOwnerQuery({ owner_id: user!._id });

  const handlerClick = (id: string, isAdded: boolean) => {
    if (isAdded) {
      removeTrack({ id, trackId: track._id });
    } else {
      addTarck({ id, trackId: track._id });
    }
  };

  return (
    <ul className="track__my-albums">
      {myAlbums &&
        myAlbums.map((album) => {
          const isAdded = album.tracks.find((item) => track._id === item._id) ? true : false;
          console.log(isAdded)
          return (
            <li key={album._id} onClick={() => handlerClick(album._id, isAdded)} className="track__my-albums-item">
              <span>{album.name}</span>
              {isAdded && (
                <svg width="11" height="8" className="track__arrow-icon" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.5 3.5L2 5L4 7L10.5 0.5" stroke="white" />
                </svg>
              )}
            </li>
          );
        })}
    </ul>
  );
};

export default MyAlbums;
