import React, { useEffect, useState } from "react";
import picture from "../../assets/img/album-img-2.jpg";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { TrackApi } from "../../store/services/TrackService";
import BtnLike from "../BtnLike";
import LineProgress from "../LinePorgress";
import "./player.scss";
import PlayerInfo from "./PlayerInfo";
import PlayerNav from "./PlayerNav";
import TrackProgress from "./TrackProgress";

const audio = new Audio();

const Player: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pause, volume, active, duration, currentTime, currentAlbum } = useAppSelector((state) => state.player);
  const { playTrack, pauseTrack, setCurrentTime, setDuration, setVolume, setActive } = playerSlice.actions;
  const [repeat, setRepeat] = useState<boolean>(false);
  const [listenTrack, {}] = TrackApi.useListenTrackMutation();

  useEffect(() => {
    audio.src = process.env.REACT_APP_API_URL + "/" + active.track?.audio;
    audio.volume = volume / 100;
    audio.play();
    dispatch(playTrack());
    audio.onloadedmetadata = () => {
      dispatch(setDuration(audio.duration));
    };
    audio.ontimeupdate = () => {
      dispatch(setCurrentTime(audio.currentTime));
    };
    listenTrack(active.track!._id);
  }, [active]);

  useEffect(() => {
    audio.onended = () => {
      if (repeat) {
        audio.currentTime = 0;
        audio.play();
      } else {
        const nextIndex = active.index + 1;
        if (currentAlbum.tracks[nextIndex]) {
          dispatch(setActive(currentAlbum.tracks[nextIndex]));
        } else {
          dispatch(pauseTrack());
        }
      }
    };
  }, [repeat]);

  useEffect(() => {
    if (pause) {
      audio.pause();
    } else {
      audio.play();
    }
  }, [pause]);

  const play = () => {
    if (pause) {
      dispatch(playTrack());
    } else {
      dispatch(pauseTrack());
    }
  };

  const changeTrackNext = () => {
    const nextIndex = active.index + 1;
    if (nextIndex <= currentAlbum.tracks.length - 1) {
      dispatch(setActive(currentAlbum.tracks[nextIndex]));
    }
  };

  const changeTrackPrev = () => {
    const prevIndex = active.index - 1;
    if (prevIndex >= 0) {
      dispatch(setActive(currentAlbum.tracks[prevIndex]));
    }
  };

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = +e.target.value / 100;
    dispatch(setVolume(+e.target.value));
  };

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = +e.target.value;
    dispatch(setCurrentTime(+e.target.value));
  };

  const hanlderRepeat = () => {
    setRepeat(!repeat);
  };

  if (!active.track) {
    return null;
  }

  return (
    <div className="player">
      <PlayerInfo name={active.track.name} picture={active.track.picture} executor={active.track.executor} />
      <BtnLike onClick={() => console.log("like")} />
      <button className="player__shuffle">
        <svg className="player__icon-shuffle" viewBox="0 0 25 25" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M20.6305 9.5L23.5001 6.5L20.6305 3.5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20.6305 21.5L23.5001 18.5L20.6305 15.5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M23.5 6.5H18.2797C16.7881 6.5 15.6695 6.9 14.9237 8.1L8.95763 16.9C7.83898 18.5 7.09322 18.5 5.60169 18.5H1.5"
            stroke="white"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M10 10L8.95763 8.1C7.83898 6.5 7.09322 6.5 5.6017 6.5H1.5M23.5 18.5H18.2797C16.7881 18.5 16 18 14.9237 16.9L13.5 15.5"
            strokeWidth="2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <PlayerNav changeTrackNext={changeTrackNext} changeTrackPrev={changeTrackPrev} pause={pause} play={play} />
      <button onClick={hanlderRepeat} className={repeat ? "player__repeat active" : "player__repeat"}>
        <svg className="player__icon-repeat" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_255_595)">
            <path
              d="M17.7084 1.04169L21.875 5.20835L17.7084 9.37502"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M3.125 11.4584V9.37504C3.125 8.26997 3.56399 7.21016 4.34539 6.42876C5.12679 5.64736 6.1866 5.20837 7.29167 5.20837H21.875"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.29167 23.9583L3.125 19.7917L7.29167 15.625"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.875 13.5417V15.625C21.875 16.7301 21.436 17.7899 20.6546 18.5713C19.8732 19.3527 18.8134 19.7917 17.7083 19.7917H3.125"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_255_595">
              <rect width="25" height="25" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
      <TrackProgress audio={audio} />
      <button className="player__sound">
        <svg className="player__icon-sound" viewBox="0 0 20 23" xmlns="http://www.w3.org/2000/svg">
          <path d="M0.240387 11.3522C0.240387 12.4699 0.665066 13.4359 1.51443 14.2502C2.36378 15.0645 3.38141 15.4716 4.56731 15.4716H6.63462C7.08334 15.4716 7.41987 15.6313 7.64423 15.9506L9.71154 19.112C10.2885 20.07 11.2019 20.549 12.4519 20.549H14.5192C15.0962 20.549 15.601 20.3494 16.0337 19.9503C16.4663 19.5511 16.6827 19.0801 16.6827 18.5372V2.15549C16.6827 1.61263 16.4744 1.14161 16.0577 0.742447C15.641 0.343282 15.1282 0.1437 14.5192 0.1437H12.4519C11.2019 0.1437 10.2885 0.622697 9.71154 1.58069L7.64423 4.74208C7.41987 5.06141 7.08334 5.22108 6.63462 5.22108H4.56731C3.38141 5.22108 2.36378 5.62822 1.51443 6.44252C0.665066 7.25682 0.240387 8.2228 0.240387 9.34046V11.3522ZM2.30769 9.34046C2.30769 8.76566 2.52404 8.27868 2.95673 7.87951C3.38943 7.48035 3.92628 7.28077 4.56731 7.28077H6.63462C7.78846 7.28077 8.70193 6.80177 9.375 5.84377L11.4423 2.68239C11.6667 2.33112 12.0032 2.15549 12.4519 2.15549H14.6154V18.5372H12.4519C12.0032 18.5372 11.6667 18.3616 11.4423 18.0103L9.375 14.8489C8.86218 13.8909 7.94872 13.4119 6.63462 13.4119H4.56731C3.92628 13.4119 3.38943 13.2124 2.95673 12.8132C2.52404 12.414 2.30769 11.927 2.30769 11.3522V9.34046ZM17.6923 7.28077V13.4119C17.6923 14.0825 18.0288 14.4178 18.7019 14.4178C19.4071 14.4178 19.7596 14.0825 19.7596 13.4119V7.28077C19.7596 6.61017 19.4071 6.27487 18.7019 6.27487C18.0288 6.27487 17.6923 6.61017 17.6923 7.28077Z" />
        </svg>
      </button>
      <LineProgress width={140} left={volume} right={100} onChange={changeVolume} />
      <button className="player__full">
        <svg className="player__icon-full" viewBox="0 0 34 33" xmlns="http://www.w3.org/2000/svg">
          <path d="M28.3058 5.5619C28.3058 5.35893 28.2225 5.16428 28.0742 5.02076C27.9259 4.87725 27.7248 4.79662 27.5151 4.79662L21.1897 4.75835C20.98 4.75835 20.7789 4.83898 20.6306 4.9825C20.4823 5.12602 20.399 5.32067 20.399 5.52363C20.399 5.7266 20.4823 5.92125 20.6306 6.06476C20.7789 6.20828 20.98 6.28891 21.1897 6.28891H25.5859L19.047 12.6331C18.9728 12.7042 18.914 12.7888 18.8739 12.8821C18.8337 12.9754 18.8131 13.0754 18.8131 13.1764C18.8131 13.2774 18.8337 13.3775 18.8739 13.4707C18.914 13.564 18.9728 13.6486 19.047 13.7198C19.1205 13.7915 19.2079 13.8484 19.3043 13.8873C19.4006 13.9261 19.504 13.9461 19.6083 13.9461C19.7127 13.9461 19.8161 13.9261 19.9124 13.8873C20.0088 13.8484 20.0962 13.7915 20.1697 13.7198L26.7245 7.3756V11.6459C26.7245 11.8488 26.8078 12.0435 26.956 12.187C27.1043 12.3305 27.3054 12.4111 27.5151 12.4111C27.7248 12.4111 27.9259 12.3305 28.0742 12.187C28.2225 12.0435 28.3058 11.8488 28.3058 11.6459V5.5619Z" />
          <path d="M4.83514 26.6714C4.83514 26.8744 4.91844 27.0691 5.06672 27.2126C5.215 27.3561 5.41611 27.4367 5.62582 27.4367L11.9512 27.475C12.1609 27.475 12.3621 27.3944 12.5103 27.2508C12.6586 27.1073 12.7419 26.9127 12.7419 26.7097C12.7419 26.5067 12.6586 26.3121 12.5103 26.1686C12.3621 26.0251 12.1609 25.9444 11.9512 25.9444L7.55507 25.9444L14.094 19.6003C14.1681 19.5291 14.2269 19.4445 14.2671 19.3512C14.3072 19.258 14.3279 19.158 14.3279 19.0569C14.3279 18.9559 14.3072 18.8559 14.2671 18.7626C14.2269 18.6694 14.1681 18.5847 14.094 18.5136C14.0205 18.4419 13.933 18.3849 13.8367 18.3461C13.7403 18.3072 13.637 18.2872 13.5326 18.2872C13.4282 18.2872 13.3249 18.3072 13.2285 18.3461C13.1322 18.3849 13.0447 18.4419 12.9712 18.5136L6.41649 24.8577L6.41649 20.5875C6.41649 20.3845 6.33319 20.1899 6.18491 20.0464C6.03663 19.9028 5.83552 19.8222 5.62582 19.8222C5.41611 19.8222 5.215 19.9028 5.06672 20.0464C4.91844 20.1899 4.83514 20.3845 4.83514 20.5875L4.83514 26.6714Z" />
        </svg>
      </button>
    </div>
  );
};

export default Player;