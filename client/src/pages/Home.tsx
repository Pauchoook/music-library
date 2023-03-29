import React from 'react';
import AlbumSlider from '../components/AlbumSlider';
import Navbar from '../components/Navbar';
import NewAlbums from '../components/NewAlbums';
import { AlbumApi } from '../store/services/AlbumService';

const Home: React.FC = () => {
  const { data: albums, isLoading: isLoadingAlbums } = AlbumApi.useGetAlbumsQuery({ limit: 20, dateSort: 'asc' });
  const recentlyPlayedAlbums = JSON.parse(localStorage.getItem("recently-played") || "{}");

  return (
    <div className="container">
      <Navbar />
      <AlbumSlider albums={recentlyPlayedAlbums} isLoading={isLoadingAlbums} title="Recently Played" />
      <NewAlbums />
      <AlbumSlider albums={albums || []} isLoading={isLoadingAlbums} title="Just for you" />
    </div>
  );
};

export default React.memo(Home);
