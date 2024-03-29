import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "./album-slider.scss";
import { IAlbum } from "../../types/album";
import { Link } from "react-router-dom";
import { ALBUM } from "../../utils/path";

interface AlbumSliderProps {
  title: string;
  albums: IAlbum[];
  isLoading?: boolean;
}

SwiperCore.use([Navigation]);

const AlbumSlider: React.FC<AlbumSliderProps> = ({ title, albums, isLoading }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <div className="album-slider">
      <div className="album-slider__header">
        <h2 className="album-slider__title">{title}</h2>
        <div className="album-slider__nav">
          <button ref={prevRef} className="album-slider__btn album-slider__btn--prev">
            <svg viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.82028 19.124L0.278801 10.7018C0.177419 10.6016 0.105775 10.493 0.0638707 10.376C0.02129 10.259 0 10.1337 0 10C0 9.86631 0.02129 9.74098 0.0638707 9.62401C0.105775 9.50704 0.177419 9.39842 0.278801 9.29815L8.82028 0.850923C9.05684 0.616974 9.35254 0.5 9.70737 0.5C10.0622 0.5 10.3664 0.62533 10.6198 0.875989C10.8733 1.12665 11 1.41909 11 1.7533C11 2.08751 10.8733 2.37995 10.6198 2.63061L3.1682 10L10.6198 17.3694C10.8564 17.6033 10.9747 17.8914 10.9747 18.2337C10.9747 18.5766 10.8479 18.8734 10.5945 19.124C10.341 19.3747 10.0453 19.5 9.70737 19.5C9.36943 19.5 9.07373 19.3747 8.82028 19.124Z" />
            </svg>
          </button>
          <button ref={nextRef} className="album-slider__btn album-slider__btn--next">
            <svg viewBox="0 0 11 19" xmlns="http://www.w3.org/2000/svg">
              <path d="M2.17972 18.624L10.7212 10.2018C10.8226 10.1016 10.8942 9.99296 10.9361 9.87599C10.9787 9.75902 11 9.63369 11 9.5C11 9.36631 10.9787 9.24098 10.9361 9.12401C10.8942 9.00704 10.8226 8.89842 10.7212 8.79815L2.17972 0.350923C1.94316 0.116974 1.64746 0 1.29263 0C0.937788 0 0.63364 0.12533 0.380184 0.375989C0.126728 0.626649 0 0.919085 0 1.2533C0 1.58751 0.126728 1.87995 0.380184 2.13061L7.8318 9.5L0.380184 16.8694C0.143625 17.1033 0.0253448 17.3914 0.0253448 17.7337C0.0253448 18.0766 0.152073 18.3734 0.40553 18.624C0.658986 18.8747 0.954685 19 1.29263 19C1.63057 19 1.92627 18.8747 2.17972 18.624Z" />
            </svg>
          </button>
        </div>
      </div>
      <Swiper
        className="album-slider__slider"
        spaceBetween={20}
        slidesPerView="auto"
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper: any) => {
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
      >
        {albums &&
          albums.map((album) => (
            <SwiperSlide key={album._id} className="album-slider__slide">
              <Link to={`${ALBUM}/${album._id}`}>
                <img
                  src={process.env.REACT_APP_API_URL + "/" + album.picture}
                  alt="Изображение альбома"
                  className="album-slider__album-img"
                />
                <h5 className="album-slider__album-title">{album.name}</h5>
                <span className="album-slider__album-owner">{album.executor}</span>
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default AlbumSlider;
