import React from 'react';
import './new-albums.scss';
import { AlbumApi } from '../../store/services/AlbumService';
import NewAlbum from './NewAlbum';

const NewAlbums: React.FC = () => {
  const {data: albums, isLoading, error} = AlbumApi.useGetAlbumsQuery({limit: 5, dateSort: 'asc'});
  return (
    <div className="new-albums">
      {albums && albums.map(album => 
        <NewAlbum key={album._id} album={album} />  
      )}
    </div>
  );
};

export default NewAlbums;
