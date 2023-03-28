import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { userSlice } from '../../store/reducers/user/UserSlice';
import AuthModal from '../Modals/AuthModal';
import './navbar.scss';

const Navbar: React.FC = () => {
  const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);
  const { isAuth, user } = useAppSelector((state) => state.user);
  const { logout } = userSlice.actions;
  const dispatch = useAppDispatch();

  const onOpenAuthModal = () => {
    document.body.style.overflow = 'hidden';
    setIsOpenAuth(true);
  };

  const onHideAuthModal = () => {
    document.body.style.overflow = 'auto';
    setIsOpenAuth(false);
  };

  return (
    <div className="navbar">
      <form className="navbar__form">
        <input type="text" className="navbar__input" placeholder="What are you looking for?" />
        <button className="navbar__btn-search">
          <svg viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.0761 2C19.1901 2 24.1522 6.9621 24.1522 13.0761C24.1522 19.1901 19.1901 24.1522 13.0761 24.1522C6.9621 24.1522 2 19.1901 2 13.0761C2 6.9621 6.9621 2 13.0761 2ZM13.0761 21.6909C17.8351 21.6909 21.6909 17.8351 21.6909 13.0761C21.6909 8.31584 17.8351 4.46136 13.0761 4.46136C8.31584 4.46136 4.46136 8.31584 4.46136 13.0761C4.46136 17.8351 8.31584 21.6909 13.0761 21.6909ZM23.5184 21.7782L27 25.2586L25.2586 27L21.7782 23.5184L23.5184 21.7782Z" />
          </svg>
        </button>
      </form>
      <nav className="navbar__nav">
        <ul className="navbar__list">
          <li className="navbar__item">
            <Link to="#" className="navbar__el">
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.1172 13.8203C16.6406 13.0078 16.0781 11.4688 16.0781 8.75V8.19531C16.0781 4.82031 13.375 2.05469 10.0469 2.03125H10C9.20049 2.03125 8.40884 2.18898 7.67038 2.49541C6.93193 2.80184 6.26119 3.25095 5.69658 3.81701C5.13197 4.38307 4.68458 5.05497 4.38005 5.7942C4.07552 6.53344 3.91982 7.3255 3.92187 8.125V8.75C3.92187 11.4688 3.35937 13.0078 2.88281 13.8203C2.78536 13.9875 2.73401 14.1776 2.73401 14.3711C2.73401 14.5646 2.78536 14.7547 2.88281 14.9219C2.97678 15.0895 3.11413 15.2287 3.28047 15.325C3.4468 15.4212 3.63597 15.4708 3.82812 15.4688H7.03125V15.625C7.03125 16.4124 7.34403 17.1675 7.90077 17.7242C8.45752 18.281 9.21264 18.5938 10 18.5938C10.7874 18.5938 11.5425 18.281 12.0992 17.7242C12.656 17.1675 12.9687 16.4124 12.9687 15.625V15.4688H16.1719C16.364 15.4708 16.5532 15.4212 16.7195 15.325C16.8859 15.2287 17.0232 15.0895 17.1172 14.9219C17.2146 14.7547 17.266 14.5646 17.266 14.3711C17.266 14.1776 17.2146 13.9875 17.1172 13.8203ZM12.0312 15.625C12.0312 16.1637 11.8172 16.6804 11.4363 17.0613C11.0554 17.4422 10.5387 17.6562 10 17.6562C9.46128 17.6562 8.94462 17.4422 8.56369 17.0613C8.18275 16.6804 7.96875 16.1637 7.96875 15.625V15.4688H12.0312V15.625ZM16.3047 14.4531C16.2926 14.4777 16.2735 14.4981 16.2499 14.512C16.2263 14.5259 16.1992 14.5326 16.1719 14.5312H3.82812C3.80078 14.5326 3.77365 14.5259 3.75006 14.512C3.72647 14.4981 3.70744 14.4777 3.69531 14.4531C3.6816 14.4294 3.67438 14.4024 3.67438 14.375C3.67438 14.3476 3.6816 14.3206 3.69531 14.2969C4.22656 13.375 4.85937 11.6719 4.85937 8.75V8.125C4.85835 7.4489 4.9905 6.77921 5.24828 6.15418C5.50607 5.52915 5.88444 4.96102 6.36179 4.48221C6.83914 4.00341 7.40612 3.62332 8.03037 3.36364C8.65461 3.10396 9.32389 2.96978 10 2.96875H10.0391C12.8516 2.98438 15.1406 5.33594 15.1406 8.19531V8.75C15.1406 11.6719 15.7734 13.375 16.3047 14.2969C16.3184 14.3206 16.3256 14.3476 16.3256 14.375C16.3256 14.4024 16.3184 14.4294 16.3047 14.4531Z" />
              </svg>
            </Link>
          </li>
          <li className="navbar__item">
            <Link to="#" className="navbar__el">
              <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8688 13.75L9.375 10.2562V4.375H10.625V9.7375L13.75 12.8687L12.8688 13.75Z" />
                <path d="M10 1.25C8.83435 1.25017 7.68058 1.48424 6.60702 1.93835C5.53346 2.39247 4.56194 3.05739 3.75 3.89375V1.25H2.5V6.25H7.5V5H4.425C5.59752 3.69706 7.18936 2.84596 8.92408 2.5945C10.6588 2.34305 12.4268 2.70714 13.921 3.62352C15.4152 4.53991 16.5413 5.95072 17.1036 7.61091C17.6659 9.27111 17.629 11.0758 16.9992 12.7116C16.3694 14.3474 15.1866 15.711 13.6561 16.5654C12.1256 17.4199 10.3442 17.7113 8.62124 17.3891C6.89827 17.0669 5.34259 16.1514 4.22437 14.8015C3.10615 13.4517 2.49604 11.7528 2.5 10H1.25C1.25 11.7306 1.76318 13.4223 2.72464 14.8612C3.6861 16.3002 5.05267 17.4217 6.65152 18.0839C8.25037 18.7462 10.0097 18.9195 11.707 18.5819C13.4044 18.2442 14.9635 17.4109 16.1872 16.1872C17.4109 14.9635 18.2442 13.4044 18.5819 11.707C18.9195 10.0097 18.7462 8.25037 18.0839 6.65152C17.4217 5.05267 16.3002 3.6861 14.8612 2.72464C13.4223 1.76318 11.7306 1.25 10 1.25Z" />
              </svg>
            </Link>
          </li>
        </ul>
        {isAuth ? (
          <div className="navbar__right">
            <Link to="/profile" className="navbar__profile">
              <img src={process.env.REACT_APP_API_URL + '/' + user?.avatar} className="navbar__profile-img" />
            </Link>
            <button onClick={() => dispatch(logout())} className="navbar__profile-btn">
              Выйти
            </button>
          </div>
        ) : (
          <button onClick={onOpenAuthModal} className="navbar__profile-btn">
            Войти
          </button>
        )}
      </nav>
      {isOpenAuth && <AuthModal hideModal={onHideAuthModal} />}
    </div>
  );
};

export default React.memo(Navbar);
