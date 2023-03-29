import React from "react";

interface PlayerInfoProps {
  picture: string;
  name: string;
  executor: string;
}

const PlayerInfo: React.FC<PlayerInfoProps> = ({picture, name, executor}) => {
  return (
    <div className="player__info">
      <img src={process.env.REACT_APP_API_URL + "/" + picture} className="player__img" />
      <div className="player__info-right">
        <h6 className="player__track-title">{name}</h6>
        <span className="player__track-executor">{executor}</span>
      </div>
    </div>
  );
};

export default PlayerInfo;
