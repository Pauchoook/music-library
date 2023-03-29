import { TimeoutId } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types";
import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { playerSlice } from "../../store/reducers/player/PlayerSlice";
import { IAlbum } from "../../types/album";
import "./album-body.scss";

interface AlbumBodyHeaderProps {
  album: IAlbum | undefined;
  handlerPlay: () => void;
  handlerSerachTracks: (str: string) => void;
}

const AlbumBodyHeader: React.FC<AlbumBodyHeaderProps> = ({ album, handlerPlay, handlerSerachTracks }) => {
  const [isActiveSearch, setIsActiveSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isActiveAlbum, setIsActiveAlbum] = useState<boolean>(false);
  const { currentAlbum, pause } = useAppSelector((state) => state.player);
  const { pauseTrack } = playerSlice.actions;
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const timeout = useRef<TimeoutId>();

  React.useEffect(() => {
    if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(() => handlerSerachTracks(searchValue), 500);
  }, [searchValue]);

  React.useEffect(() => {
    setIsActiveAlbum(album?._id === currentAlbum._id && !pause);
  }, [currentAlbum, pause, album]);

  const handlerPlayAlbum = () => {
    if (isActiveAlbum) {
      dispatch(pauseTrack());
    } else {
      handlerPlay();
    }
  };

  const handlerClickSearch = () => {
    if (!isActiveSearch) {
      setIsActiveSearch(true);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  return (
    <div className="album-body__header">
      <button onClick={handlerPlayAlbum} disabled={!album?.tracks.length} className="album-body__play">
        {isActiveAlbum ? (
          <svg className="album-body__play-icon" viewBox="0 0 17 20" xmlns="http://www.w3.org/2000/svg">
            <rect width="5" height="20" rx="2.5" />
            <rect x="12" width="5" height="20" rx="2.5" />
          </svg>
        ) : (
          <svg className="album-body__play-icon" viewBox="0 0 11 13" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.58854 12.7319C1.24132 12.9576 0.889583 12.9704 0.533333 12.7704C0.177778 12.5711 0 12.2631 0 11.8464V1.0652C0 0.648531 0.177778 0.340198 0.533333 0.140198C0.889583 -0.0591078 1.24132 -0.0459133 1.58854 0.179781L10.0781 5.57041C10.3906 5.77874 10.5469 6.07388 10.5469 6.45582C10.5469 6.83777 10.3906 7.13291 10.0781 7.34124L1.58854 12.7319Z" />
          </svg>
        )}
      </button>
      <div className={isActiveSearch ? "album-body__search active" : "album-body__search"}>
        <input
          value={searchValue}
          ref={inputRef}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          placeholder="Search track"
          className="album-body__search-input"
        />
        <button onClick={handlerClickSearch} className="album-body__search-btn">
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0761 2C19.1901 2 24.1522 6.9621 24.1522 13.0761C24.1522 19.1901 19.1901 24.1522 13.0761 24.1522C6.9621 24.1522 2 19.1901 2 13.0761C2 6.9621 6.9621 2 13.0761 2ZM13.0761 21.6909C17.8351 21.6909 21.6909 17.8351 21.6909 13.0761C21.6909 8.31584 17.8351 4.46136 13.0761 4.46136C8.31584 4.46136 4.46136 8.31584 4.46136 13.0761C4.46136 17.8351 8.31584 21.6909 13.0761 21.6909ZM23.5184 21.7782L27 25.2586L25.2586 27L21.7782 23.5184L23.5184 21.7782Z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AlbumBodyHeader;
