import React from 'react';
import { TrackApi } from '../../store/services/TrackService';
import './top-tracks.scss';
import TopTrack from './TopTrack';

const TopTracks: React.FC = () => {
  const {data: tracks, isLoading} = TrackApi.useGetTracksQuery(5);

  return (
    <div className="top-tracks">
      <h2 className="top-tracks__title">Top tracks of this month</h2>
      <span className="top-tracks__content">Visible only to you</span>
      <ul className="top-tracks__list">
        {tracks && tracks.map((track, index) => 
          <TopTrack key={track._id} number={index + 1} track={track} />  
        )}
      </ul>
    </div>
  );
};

export default TopTracks;
