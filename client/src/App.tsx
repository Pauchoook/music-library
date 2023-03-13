import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import { useAppDispatch } from './hooks/redux';
import { check } from './store/reducers/user/ActionCreators';
import Player from './components/Player';
import './app.scss';
import AppWrapper from './components/AppWrapper';

function App() {
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(check());
  }, []);

  const handlerLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation(); // чтобы меню не закрывалось по клику на кнопку
    setIsLeft(!isLeft);
  };

  return (
    <div className={isLeft ? 'app left' : 'app'}>
      <BrowserRouter>
        {/* position sticky и fixed не работает из-за transform на родителе */}
        <Sidebar close={() => setIsLeft(false)} />
        <AppWrapper isLeft={isLeft} handlerLeft={handlerLeft} />
      </BrowserRouter>
      <Player />
    </div>
  );
}

export default App;
