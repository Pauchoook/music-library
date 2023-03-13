import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { HOME } from '../utils/path';
import { authRoutes, publicRoutes } from '../utils/routes';

const AppRouter: React.FC = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  return (
    <Routes>
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      {isAuth && authRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}
      <Route path='*' element={<Navigate to={HOME} />} />
    </Routes>
  );
};

export default AppRouter;
