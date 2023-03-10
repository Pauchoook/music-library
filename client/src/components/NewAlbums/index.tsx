import React from 'react';
import { Link } from 'react-router-dom';
import avatar from '../../assets/img/avatar.jpg';
import picutreAlbum from '../../assets/img/album-img-1.jpg';
import './new-albums.scss';

const NewAlbums = () => {
  return (
    <div className="new-albums">
      <div className="new-albums__item">
        <div className="new-albums__header">
          <Link to="#" className="new-albums__btn-avatar">
            <img src={avatar} alt="Аватарка" className="new-albums__avatar" />
          </Link>
          <div className="new-albums__header-info">
            <span className="new-albums__header-content">New release</span>
            <h4 className="new-albums__executor-name">M83</h4>
          </div>
        </div>
        <div className="new-albums__album">
          <button className="new-albums__play">
            <svg viewBox="0 0 11 13" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.58854 12.7319C1.24132 12.9576 0.889583 12.9704 0.533333 12.7704C0.177778 12.5711 0 12.2631 0 11.8464V1.0652C0 0.648531 0.177778 0.340198 0.533333 0.140198C0.889583 -0.0591078 1.24132 -0.0459133 1.58854 0.179781L10.0781 5.57041C10.3906 5.77874 10.5469 6.07388 10.5469 6.45582C10.5469 6.83777 10.3906 7.13291 10.0781 7.34124L1.58854 12.7319Z" />
            </svg>
          </button>
          <img src={picutreAlbum} alt="Изображение альбома" className="new-albums__album-picture" />
          <div className="new-albums__album-info">
            <h6 className="new-albums__album-title">Fantasy - Chapter 1</h6>
            <span className="new-albums__album-descr">Мини - альбом - M83</span>
          </div>
        </div>
      </div>
      <div className="new-albums__item">
        <div className="new-albums__header">
          <Link to="#" className="new-albums__btn-avatar">
            <img src={avatar} alt="Аватарка" className="new-albums__avatar" />
          </Link>
          <div className="new-albums__header-info">
            <span className="new-albums__header-content">New release</span>
            <h4 className="new-albums__executor-name">M83</h4>
          </div>
        </div>
        <div className="new-albums__album">
          <button className="new-albums__play">
            <svg viewBox="0 0 11 13" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.58854 12.7319C1.24132 12.9576 0.889583 12.9704 0.533333 12.7704C0.177778 12.5711 0 12.2631 0 11.8464V1.0652C0 0.648531 0.177778 0.340198 0.533333 0.140198C0.889583 -0.0591078 1.24132 -0.0459133 1.58854 0.179781L10.0781 5.57041C10.3906 5.77874 10.5469 6.07388 10.5469 6.45582C10.5469 6.83777 10.3906 7.13291 10.0781 7.34124L1.58854 12.7319Z" />
            </svg>
          </button>
          <img src={picutreAlbum} alt="Изображение альбома" className="new-albums__album-picture" />
          <div className="new-albums__album-info">
            <h6 className="new-albums__album-title">Fantasy - Chapter 1</h6>
            <span className="new-albums__album-descr">Мини - альбом - M83</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAlbums;
