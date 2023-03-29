import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { ITrack } from "../../types/track";
import BtnLike from "../BtnLike";
import DropdownTrack from "./DropdownTrack";
import "./track.scss";

interface TrackProps {
  track: ITrack;
  number: number;
  active: boolean; // активен ли текущий трек
  handlerPlay?: () => void;
}

const Track: React.FC<TrackProps> = ({ track, number, active, handlerPlay }) => {
  const { setActive } = playerSlice.actions;
  const dispatch = useAppDispatch();

  const handlerClick = () => {
    if (!active) {
      if (handlerPlay) {
        handlerPlay();
      }
      dispatch(setActive(track));
    };
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
      <BtnLike onClick={() => console.log("like")} />
      <span className="track__time">01:50</span>
      <DropdownTrack track={track} />
    </li>
  );
};

export default React.memo(Track);
