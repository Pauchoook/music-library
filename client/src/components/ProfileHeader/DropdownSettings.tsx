import React, { useEffect, useState } from 'react';
import AddTrackModal from '../Modals/AddTrackModal';
import AvatarModal from '../Modals/AvatarModal';
import EditProfileModal from '../Modals/EditProfileModal';

const DropdownSettings: React.FC = () => {
  const [isChangeAvatar, setIsChangeAvatar] = useState<boolean>(false);
  const [isEditProfile, setIsEditProfile] = useState<boolean>(false);
  const [isAddTrack, setIsAddTrack] = useState<boolean>(false);

  const hideChangeAvatar = () => {
    setIsChangeAvatar(false);
  }

  const hideEditProfile = () => {
    setIsEditProfile(false);
  }

  const hideTrackModal = () => {
    setIsAddTrack(false);
  }

  return (
    <div className="profile-header__settings">
      <div className="dropdown profile-header__settings-dropdown">
        <div className="profile-header__settings-btn">
          <span className="profile-header__settings-circle"></span>
          <span className="profile-header__settings-circle"></span>
          <span className="profile-header__settings-circle"></span>
        </div>
        <ul onClick={(e) => e.stopPropagation()} className="dropdown__item profile-header__settings-list">
          <li onClick={() => setIsChangeAvatar(true)} className="profile-header__settings-item">Изменить аватар</li>
          <li onClick={() => setIsEditProfile(true)} className="profile-header__settings-item">Редактировать профиль</li>
          <li onClick={() => setIsAddTrack(true)} className="profile-header__settings-item">Добавить трек</li>
        </ul>
      </div>
      {isChangeAvatar && <AvatarModal hideModal={hideChangeAvatar} />}
      {isEditProfile && <EditProfileModal hideModal={hideEditProfile} />}
      {isAddTrack && <AddTrackModal hideModal={hideTrackModal} />}
    </div>
  );
};

export default DropdownSettings;
