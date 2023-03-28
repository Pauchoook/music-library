import React from "react";
import { useAppDispatch } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { ITrack } from "../../types/track";
import DropdownTrack from "./DropdownTrack";
import "./track.scss";

interface TrackProps {
  track: ITrack;
  number: number;
  active: boolean;
  handlerPlay?: () => void;
}

const Track: React.FC<TrackProps> = ({ track, number, active, handlerPlay }) => {
  const { setActive } = playerSlice.actions;
  const dispatch = useAppDispatch();

  const handlerClick = () => {
    dispatch(setActive(track));
    if (handlerPlay) {
      handlerPlay();
    }
  };

  return (
    <li onClick={handlerClick} className={active ? "track active" : "track"}>
      <span className="track__number">{number}</span>
      <div className="track__item-left">
        <img src={process.env.REACT_APP_API_URL + "/" + track.picture} alt="Изображение" className="track__img" />
        <div className="track__info">
          <h6 className="track__name">{track.name}</h6>
          <span className="track__executor">{track.executor}</span>
        </div>
      </div>
      <h5 className="track__name-middle">{track.name}</h5>
      <button className="track__btn-like">
        <svg viewBox="0 0 21 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.5 19.5L8.9775 18.1332C3.57 13.2978 0 10.0984 0 6.19482C0 2.99537 2.541 0.5 5.775 0.5C7.602 0.5 9.3555 1.33869 10.5 2.65368C11.6445 1.33869 13.398 0.5 15.225 0.5C18.459 0.5 21 2.99537 21 6.19482C21 10.0984 17.43 13.2978 12.0225 18.1332L10.5 19.5Z" />
        </svg>
      </button>
      <span className="track__time">01:50</span>
      <DropdownTrack track={track} />
    </li>
  );
};

export default React.memo(Track);
