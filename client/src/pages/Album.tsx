import React from "react";
import { useParams } from "react-router-dom";
import AlbumBody from "../components/AlbumBody";
import AlbumHeader from "../components/AlbumHeader";
import Navbar from "../components/Navbar";
import { AlbumApi } from "../store/services/AlbumService";

const Album: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { data: album, isLoading } = AlbumApi.useGetAlbumOneQuery({ id });

  return (
    <div className="container">
      <Navbar />
      {isLoading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <AlbumHeader img={album!.picture} title={album!.name} owner={album!.owner} />
          <AlbumBody album={album} />
        </>
      )}
    </div>
  );
};

export default Album;
