import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import ProfileHeader from "../components/ProfileHeader";
import TopExecutors from "../components/TopExecutors";
import TopTracks from "../components/TopTracks";

const Profile: React.FC = () => {
  return (
    <div className="container">
      <Navbar />
      <ProfileHeader />
      <TopExecutors />
      <TopTracks />
    </div>
  );
};

export default React.memo(Profile);
