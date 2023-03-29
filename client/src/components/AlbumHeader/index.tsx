import React from "react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux";
import { IUser } from "../../types/user";
import "./album-header.scss";

interface AlbumHeaderProps {
  img: string;
  title: string;
  listens: number;
  owner: IUser;
}

const AlbumHeader: React.FC<AlbumHeaderProps> = ({ img, title, owner, listens }) => {
  const { user } = useAppSelector((state) => state.user);
  const isMyAlbum = user!._id === owner._id;

  return (
    <div className="album-header">
      <img src={process.env.REACT_APP_API_URL + "/" + img} alt="Фотография альбома" className="album-header__img" />
      <div className="album-header__info">
        <span className="album-header__subtitle">Плейлист</span>
        <h1 className="album-header__title">{title}</h1>
        {!isMyAlbum && (
          <Link to="/" className="album-header__owner">
            <img
              src={process.env.REACT_APP_API_URL + "/" + owner.avatar}
              alt="Аватар"
              className="album-header__owner-avatar"
            />
            <span className="album-header__owner-username">{owner.username}</span>
          </Link>
        )}
        <span className="album-header__listens">
          Listens: {listens}
        </span>
      </div>
    </div>
  );
};

export default React.memo(AlbumHeader);
