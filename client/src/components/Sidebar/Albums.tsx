import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux';
import { AlbumApi } from '../../store/services/AlbumService';

interface AlbumsProps {
  openCreateAlbum: () => void;
}

const Albums: React.FC<AlbumsProps> = ({ openCreateAlbum }) => {
  const { user } = useAppSelector((state) => state.user);
  const { data: myAlbums } = AlbumApi.useGetAlbumsOwnerQuery({ owner_id: user!._id, limit: 5 });

  return (
    <div className="sidebar__albums">
      <button onClick={openCreateAlbum} className="sidebar__albums-btn">
        <div className="sidebar__albums-btn-block">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1V21" strokeLinecap="round" />
            <path d="M21 11L0.999999 11" strokeLinecap="round" />
          </svg>
        </div>
        <span>Создать плейлист</span>
      </button>
      <ul className="sidebar__albums-list">
        {myAlbums &&
          myAlbums.map((album) => (
            <li key={album._id} className="sidebar__albums-item">
              <Link to={`/${album._id}`} className="sidebar__albums-el">
                <img src={process.env.REACT_APP_API_URL + '/' + album.picture} alt="Изображение" className="sidebar__albums-img" />
                <h5 className="sidebar__albums-list-title">{album.name}</h5>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default React.memo(Albums);
