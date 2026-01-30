import React, { FC } from 'react';
import style from './AppRouter.module.styl';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ErrorUrlEnum, PublicRoutesEnum } from 'src/router/router';
import ErrorHandler from 'src/components/ErrorHandler/ErrorHandler';
import Error404 from 'src/components/Error404/Error404';
import Calculate from 'src/pages/Calculate/Calculate';

const AppRouter: FC = () => {
  return (
    <div className={style.root}>
      <>
        <Routes>
          <Route path={`${ErrorUrlEnum.ERROR}/*`} element={<ErrorHandler />} />
          <Route path={PublicRoutesEnum.ROOT} element={<Calculate />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </>
    </div>
  );
};

export default AppRouter;
