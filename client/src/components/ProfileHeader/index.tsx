import React from 'react';
import { useAppSelector } from '../../hooks/redux';
import DropdownSettings from './DropdownSettings';
import './profile-header.scss';

const ProfileHeader: React.FC = () => {
  const {user} = useAppSelector(state => state.user);

  return (
    <div className="profile-header">
      <img src={process.env.REACT_APP_API_URL + '/' + user?.avatar} alt="Аватар" className="profile-header__avatar" />
      <div className="profile-header__info">
        <h4 className="profile-header__subtitle">Profile</h4>
        <h1 className="profile-header__username">{user?.username}</h1>
        <span className="profile-header__count-subscribers">13 subscriptions</span>
      </div>
      <DropdownSettings />
    </div>
  );
};

export default React.memo(ProfileHeader);
