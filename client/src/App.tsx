import React, {useEffect, useState} from 'react';
import Sidebar from './components/Sidebar';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import { useAppDispatch } from './hooks/redux';
import { check } from './store/reducers/user/ActionCreators';
import Player from './components/Player';
import './app.scss';

function App() {
  const [isLeft, setIsLeft] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(check());
  }, []);

  const handlerLeft = () => {
    setIsLeft(!isLeft);
  }

  return (
    <div className={isLeft ? "app left" : "app"}>
      <BrowserRouter>
        <Sidebar isOpen={isLeft} toggleMenu={handlerLeft} />
        <div className={isLeft ? "app__wrapper left-open" : "app__wrapper"}>
          <AppRouter />
        </div>
      </BrowserRouter>
      {/* <Player /> */}
    </div>
  );
}

export default App;
