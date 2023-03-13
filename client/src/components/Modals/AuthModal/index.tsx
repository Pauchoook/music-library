import React, { useState } from 'react';
import { ModalProps } from '../../../types/modal';
import LoginForm from '../../AuthForm/LoginForm';
import RegistrationForm from '../../AuthForm/RegistrationForm';

const AuthModal: React.FC<ModalProps> = ({ hideModal }) => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isRegistration, setIsRegistration] = useState<boolean>(false);

  const handlerOpenLogin = () => {
    setIsRegistration(false);
    setIsLogin(true);
  };

  const handlerOpenRegistration = () => {
    setIsRegistration(true);
    setIsLogin(false);
  };

  return (
    <div onClick={hideModal} className="modal modal-wrapper">
      <div onClick={(e) => e.stopPropagation()} className="modal__window">
        <button onClick={hideModal} className="modal__close">
          <svg
            className='modal__icon-close'
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <h3 className="modal__title">Authorization</h3>
        <p className="modal__content">Music for everyone</p>
        {isLogin && <LoginForm openRegistration={handlerOpenRegistration} hide={hideModal} />}
        {isRegistration && <RegistrationForm openLogin={handlerOpenLogin} hide={hideModal} />}
      </div>
    </div>
  );
};

export default AuthModal;
