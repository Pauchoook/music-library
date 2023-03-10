import React from 'react';
import { Link } from 'react-router-dom';
import picture from '../../assets/img/playlists-img.png';

interface AlbumsProps {
  openModal: () => void;
}

const Albums: React.FC<AlbumsProps> = ({openModal}) => {
  return (
    <div className="sidebar__albums">
      <button onClick={openModal} className="sidebar__albums-btn">
        <div className="sidebar__albums-btn-block">
          <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 1V21" strokeLinecap="round" />
            <path d="M21 11L0.999999 11" strokeLinecap="round" />
          </svg>
        </div>
        <span>Создать плейлист</span>
      </button>
      <ul className="sidebar__albums-list">
        <li className="sidebar__albums-item">
          <Link to="/" className="sidebar__albums-el">
            <img src={picture} alt="Изображение" className="sidebar__albums-img" />
            <h5 className="sidebar__albums-list-title">Любимые треки</h5>
          </Link>
        </li>
        <li className="sidebar__albums-item">
          <Link to="/" className="sidebar__albums-el">
            <img src={picture} alt="Изображение" className="sidebar__albums-img" />
            <h5 className="sidebar__albums-list-title">Любимые треки</h5>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Albums;
