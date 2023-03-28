import React, {useState} from 'react'
import { ITrack } from '../../types/track';
import MyAlbums from './MyAlbums';

interface DropdownTrackProps {
  track: ITrack;
}

const DropdownTrack: React.FC<DropdownTrackProps> = ({track}) => {
  const [isOpenAlbums, setIsOpenAlbums] = useState<boolean>(false);

  return (
    <div onClick={(e) => e.stopPropagation()} className="dropdown track__settings-dropdown">
      <div className="track__settings-btn">
        <span className="track__settings-circle"></span>
        <span className="track__settings-circle"></span>
        <span className="track__settings-circle"></span>
      </div>
      <ul className="dropdown__item track__settings-list">
        <li className="track__settings-item">
          <button
            onClick={() => setIsOpenAlbums(!isOpenAlbums)}
            className={isOpenAlbums ? "track__settings-item-btn active" : "track__settings-item-btn"}
          >
            <span>Add to album</span>
            <svg className="track__settings-item-arrow" viewBox="0 0 11 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.82028 19.124L0.278801 10.7018C0.177419 10.6016 0.105775 10.493 0.0638707 10.376C0.02129 10.259 0 10.1337 0 10C0 9.86631 0.02129 9.74098 0.0638707 9.62401C0.105775 9.50704 0.177419 9.39842 0.278801 9.29815L8.82028 0.850923C9.05684 0.616974 9.35254 0.5 9.70737 0.5C10.0622 0.5 10.3664 0.62533 10.6198 0.875989C10.8733 1.12665 11 1.41909 11 1.7533C11 2.08751 10.8733 2.37995 10.6198 2.63061L3.1682 10L10.6198 17.3694C10.8564 17.6033 10.9747 17.8914 10.9747 18.2337C10.9747 18.5766 10.8479 18.8734 10.5945 19.124C10.341 19.3747 10.0453 19.5 9.70737 19.5C9.36943 19.5 9.07373 19.3747 8.82028 19.124Z" />
            </svg>
          </button>
          {isOpenAlbums && <MyAlbums track={track} />}
        </li>
      </ul>
    </div>
  );
}

export default DropdownTrack