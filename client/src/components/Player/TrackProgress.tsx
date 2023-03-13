import React from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { playerSlice } from '../../store/reducers/player/PlayerSlice';
import LineProgress from '../LinePorgress';

interface TrackProgressProps {
  audio: any,
  // changeCurrentTime: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TrackProgress: React.FC<TrackProgressProps> = ({audio}) => {
  const { currentTime, duration } = useAppSelector((state) => state.player);
  const {setCurrentTime} = playerSlice.actions;
  const dispatch = useAppDispatch();
  const currentMinutes =
    Math.floor(currentTime / 60) < 10 ? `0${Math.floor(currentTime / 60)}` : Math.floor(currentTime / 60);
  const currentSeconds =
    Math.floor(currentTime % 60) < 10 ? `0${Math.floor(currentTime % 60)}` : Math.floor(currentTime % 60);
  const allMinutes = Math.floor(duration / 60) < 10 ? `0${Math.floor(duration / 60)}` : Math.floor(duration / 60);
  const allSeconds = Math.floor(duration % 60) < 10 ? `0${Math.floor(duration % 60)}` : Math.floor(duration % 60);

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target.value;
    dispatch(setCurrentTime(+e.target.value));
  };
  return (
    <>
      <span className="player__value">
        {currentMinutes}:{currentSeconds}
      </span>
      <LineProgress width={500} left={currentTime} right={duration} onChange={changeCurrentTime} />
      <span className="player__value player__value--right">
        {allMinutes}:{allSeconds}
      </span>
    </>
  );
};

export default TrackProgress;
