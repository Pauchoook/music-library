import React from 'react'
import Navbar from '../components/Navbar';
import ProfileHeader from '../components/ProfileHeader';
import TopExecutors from '../components/TopExecutors';
import TopTracks from '../components/TopTracks';

const Profile: React.FC = () => {
  return (
    <div style={{minHeight: '100vh'}} className='container'>
      <Navbar />
      <ProfileHeader />
      <TopExecutors />
      <TopTracks />
    </div>
  )
}

export default Profile;