import React, {useEffect, useState} from 'react';
import './sidebar.scss';
import NavList from './NavList';
import Albums from './Albums';
import AddAlbumModal from '../Modals/AddAlbumModal';
import { useAppSelector } from '../../hooks/redux';

interface SidebarProps {
  close: () => void
}

const Sidebar: React.FC<SidebarProps> = ({close}) => {
  const {isAuth} = useAppSelector(state => state.user);
  const [isOpenAddAlbum, setIsOpenAddAlbum] = useState<boolean>(false);

  useEffect(() => {
    document.addEventListener('click', close);
  }, []);

  const onOpenAddAlbum = () => {
    document.body.style.overflow = 'hidden';
    setIsOpenAddAlbum(true);
  }

  const onCloseAddAlbum = () => {
    document.body.style.overflow = 'auto';
    setIsOpenAddAlbum(false);
  }

  return (
    <>
      <div onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()} className="sidebar">
        <h3 className="sidebar__title">Music Library</h3>
        <NavList />
        {isAuth && <Albums openCreateAlbum={onOpenAddAlbum} />}
      </div>
      {isOpenAddAlbum && <AddAlbumModal hideModal={onCloseAddAlbum} />}
    </>
  );
};

export default React.memo(Sidebar);
